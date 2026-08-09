// ─── عنوان خادم الربط ───────────────────────────────
const API_URL = 'https://timeout-appeals.discloud.app/api'

// ─── دالة إرسال الطلبات ──────────────────────────────
async function apiRequest(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
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
        alert(`تعذر الاتصال بالبوت!\n\nالسبب: ${err.message}\n\nتأكد من:\n✅ البوت شغال في Discloud\n✅ الرابط صحيح\n✅ كلمة السر متطابقة`);
        return null;
    }
}
