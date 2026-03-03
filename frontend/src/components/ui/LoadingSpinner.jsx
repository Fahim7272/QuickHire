export default function LoadingSpinner({ text = 'Loading…' }) {
    return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #E2E8F0', borderTopColor: '#4F46E5', animation: 'spin 0.75s linear infinite' }} />
            <p style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500 }}>{text}</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 20, animation: 'pulse 1.4s ease-in-out infinite' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: '#F1F5F9' }} />
                <div style={{ width: 64, height: 22, borderRadius: 9999, background: '#F1F5F9' }} />
            </div>
            <div style={{ height: 14, background: '#F1F5F9', borderRadius: 6, marginBottom: 8, width: '70%' }} />
            <div style={{ height: 11, background: '#F1F5F9', borderRadius: 6, marginBottom: 16, width: '45%' }} />
            <div style={{ height: 10, background: '#F1F5F9', borderRadius: 6, marginBottom: 6 }} />
            <div style={{ height: 10, background: '#F1F5F9', borderRadius: 6, width: '80%', marginBottom: 16 }} />
            <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ height: 22, width: 56, borderRadius: 9999, background: '#F1F5F9' }} />
                <div style={{ height: 22, width: 56, borderRadius: 9999, background: '#F1F5F9' }} />
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
        </div>
    );
}
