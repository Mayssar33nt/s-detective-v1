import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';
import './index.css';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div style={{ 
      color: 'white', 
      textAlign: 'center', 
      padding: '50px',
      backgroundColor: '#1e293b',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Cairo, sans-serif'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#f59e0b' }}>حدث خطأ في التطبيق</h2>
      <details style={{ whiteSpace: 'pre-wrap', marginBottom: '20px', color: '#e5e7eb' }}>
        {error.message}
      </details>
      <button 
        onClick={resetErrorBoundary}
        style={{
          backgroundColor: '#f59e0b',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        إعادة المحاولة
      </button>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = `
    <div style="color: white; text-align: center; padding: 50px; background-color: #1e293b; min-height: 100vh; display: flex; justify-content: center; align-items: center; font-family: Cairo, sans-serif;">
      <div>
        <h2 style="color: #f59e0b; margin-bottom: 20px;">خطأ: لم يتم العثور على العنصر الجذر</h2>
        <p style="color: #e5e7eb;">يرجى إعادة تحميل الصفحة</p>
      </div>
    </div>
  `;
} else {
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          console.error('Application error:', error, errorInfo);
        }}
        onReset={() => {
          // Optionally clear any error state
          window.location.reload();
        }}
      >
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}