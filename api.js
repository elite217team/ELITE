// ─── إعدادات الربط ──────────────────────────────
// ضع رابط بوتك هنا بعد ما ترفعه على Discloud
// مثال: const API_BASE_URL = 'https://abc123.discloud.app/api';
const API_BASE_URL = 'timeout-appeals.discloud.app/api';

// ضع نفس كلمة السر التي كتبتها في ملف .env للبوت
// مثال: const API_KEY = 'P16yie33Q2llOpE-5bMAahtL2CmpK6Q-:Abc123!XyZ987@';
const API_KEY = '
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM5MDExMzE0MDQyNDI4NzQyNDQwMjEwMSIsImtleSI6IjhkZmFlODFhYTNhZGJmY2IxNjE1NmE3ODFlOWMifQ.NgiRax_rqNbR40hvieZw7XOI1e8zT6ool3p5pE62KRo';

// ─── دوال الاتصال بالبوت ───────────────────────
async function sendAPI(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        };
        if (body) options.body = JSON.stringify(body);

        const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('❌ خطأ في الاتصال بالبوت:', err);
        alert('تعذر الاتصال بالبوت! تحقق من الرابط والمفتاح.');
        return null;
    }
}

// ─── جلب وتحديث الإعدادات ──────────────────────
async function loadSettings() {
    const data = await sendAPI('/settings');
    if (data) {
        console.log('✅ تم تحميل الإعدادات من البوت:', data);
        return data;
    }
}

async function saveSettings(settings) {
    const res = await sendAPI('/update-settings', 'POST', settings);
    if (res && res.success) {
        showToast('✅ تم حفظ الإعدادات وتحديث البوت بنجاح!');
    } else {
        showToast('❌ حدث خطأ أثناء الحفظ!', 'خطأ');
    }
}

// ─── عرض رسائل التنبيه ─────────────────────────
function showToast(message, type = 'نجاح') {
    const colors = {
        'نجاح': '#00C456',
        'تحذير': '#FF9500',
        'خطأ': '#FF3B30',
        'معلومات': '#2580FF'
    };
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: ${colors[type]}; color: white;
        padding: 12px 20px; border-radius: 8px;
        font-weight: 600; z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// ─── تشغيل تلقائي عند تحميل الصفحة ────────────
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ ملف الربط جاهز للعمل!');
    loadSettings();
});
