// ─── عنوان خادم الربط ───────────────────────────────
const API_URL = 'https://timeout-appeals.discloud.app/api';

// ─── كلمة السر ────────────────────────────────────────
const API_KEY = 'P16yie33Q2110pE-5bMAahtL2CmpK6Q-:Abc123!XyZ987@';

// ─── دالة إرسال الطلبات ──────────────────────────────
async function apiRequest(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method: method,
            mode: 'cors', // ✅ مهم للسماح بالاتصال
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY // ✅ مهم جداًً — كلمة السر
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(`${API_URL}${endpoint}`, options);

        if (!res.ok) {
            throw new Error(`خطأ في الرابط: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.error('❌ خطأ في الاتصال:', err);
        alert(`تعذر الاتصال!\n\nالسبب: ${err.message}`);
        return null;
    }
}
