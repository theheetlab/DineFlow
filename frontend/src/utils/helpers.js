export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

export const getMinDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30',
];

export const guestOptions = Array.from({ length: 10 }, (_, i) => i + 1);

export const categories = [
  { value: 'all', label: 'All Items' },
  { value: 'appetizers', label: 'Appetizers' },
  { value: 'main-course', label: 'Main Course' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'sides', label: 'Sides' },
  { value: 'specials', label: 'Specials' },
];

export const sortOptions = [
  { value: '', label: 'Latest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' },
  { value: 'rating', label: 'Highest Rated' },
];

export const statusColors = {
  pending: '#f59e0b',
  confirmed: '#10b981',
  completed: '#3b82f6',
  cancelled: '#ef4444',
};

export const getStatusColor = (status) => statusColors[status] || '#888';

export const truncate = (str, len = 100) => {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '...' : str;
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
