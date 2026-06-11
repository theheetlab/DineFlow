import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import SEO from '../../components/SEO';
import { reservationAPI, customerAPI, availabilityAPI, activityAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Dashboard.css';

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [customerStats, setCustomerStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const fetchInBatches = async () => {
      try {
        const [resRes, custRes] = await Promise.all([
          reservationAPI.getStats(),
          customerAPI.getStats(),
        ]);
        if (!mountedRef.current) return;
        setStats(resRes.data);
        setCustomerStats(custRes.data);

        await new Promise((r) => setTimeout(r, 300));
        if (!mountedRef.current) return;

        const [trendRes, dishesRes] = await Promise.all([
          availabilityAPI.getTrends({ days: 30 }),
          availabilityAPI.getPopularDishes(),
        ]);
        if (!mountedRef.current) return;
        setTrends(trendRes.data);
        setPopularDishes(dishesRes.data);

        await new Promise((r) => setTimeout(r, 300));
        if (!mountedRef.current) return;

        const [revRes, actRes] = await Promise.all([
          availabilityAPI.getRevenue(),
          activityAPI.getAll({ limit: 10 }),
        ]);
        if (!mountedRef.current) return;
        setRevenue(revRes.data);
        setActivities(actRes.data);
      } catch (err) {
        if (!mountedRef.current) return;
        if (err.response?.status !== 429) console.error('Failed to load dashboard data:', err);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };
    fetchInBatches();

    return () => { mountedRef.current = false; };
  }, []);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  const cards = [
    { label: 'Total Reservations', value: stats?.total || 0, color: '#3b82f6', icon: '📅' },
    { label: "Today's Reservations", value: stats?.today || 0, color: '#10b981', icon: '📋' },
    { label: 'Monthly Reservations', value: stats?.monthly || 0, color: '#f59e0b', icon: '📈' },
    { label: 'Total Customers', value: customerStats?.total || 0, color: '#8b5cf6', icon: '👥' },
  ];

  const statusPieData = [
    { name: 'Pending', value: stats?.pending || 0 },
    { name: 'Confirmed', value: stats?.confirmed || 0 },
    { name: 'Completed', value: stats?.completed || 0 },
    { name: 'Cancelled', value: stats?.cancelled || 0 },
  ];

  return (
    <>
      <SEO title="Admin Dashboard" />

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here is your restaurant overview.</p>
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.label} className="stat-card" style={{ borderTopColor: card.color }}>
            <div className="stat-card-header">
              <span className="stat-icon">{card.icon}</span>
              <span className="stat-value">{card.value}</span>
            </div>
            <span className="stat-label">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Reservation Trends (30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="_id" tick={{ fontSize: 11 }} stroke="var(--text-light)" />
              <YAxis stroke="var(--text-light)" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} name="Total" dot={false} />
              <Line type="monotone" dataKey="confirmed" stroke="#10b981" strokeWidth={2} name="Confirmed" dot={false} />
              <Line type="monotone" dataKey="cancelled" stroke="#ef4444" strokeWidth={2} name="Cancelled" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Reservation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Popular Dishes (by Rating)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularDishes}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--text-light)" />
              <YAxis stroke="var(--text-light)" domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="rating" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Rating" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Revenue Overview</h3>
          <div className="revenue-stats">
            {revenue && (
              <>
                <div className="revenue-item">
                  <span className="revenue-label">Menu Items</span>
                  <span className="revenue-value">{revenue.totalMenuItems}</span>
                </div>
                <div className="revenue-item">
                  <span className="revenue-label">Avg. Item Price</span>
                  <span className="revenue-value">${revenue.averageItemPrice}</span>
                </div>
                <div className="revenue-item">
                  <span className="revenue-label">Completed Reservations</span>
                  <span className="revenue-value">{revenue.completedReservations}</span>
                </div>
                <div className="revenue-item">
                  <span className="revenue-label">Est. Revenue</span>
                  <span className="revenue-value revenue-total">${revenue.estimatedRevenue.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activities.length === 0 ? (
              <p className="no-activity">No recent activity</p>
            ) : activities.map((a) => (
              <div key={a._id} className="activity-item">
                <span className="activity-action">{a.action}</span>
                <p className="activity-desc">{a.description}</p>
                <span className="activity-time">
                  {new Date(a.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <Link to="/admin/reservations" className="quick-action-btn">Manage Reservations</Link>
            <Link to="/admin/menu" className="quick-action-btn">Manage Menu</Link>
            <Link to="/admin/testimonials" className="quick-action-btn">Manage Testimonials</Link>
            <Link to="/admin/contacts" className="quick-action-btn">View Messages</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
