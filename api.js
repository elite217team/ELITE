const API_BASE_URL = 'https://timeout-appeals.discloud.app/api';
const API_KEY = 'P16yie33Q2110pE-5bMAahtL2CmpK6Q-:Abc123!XyZ987@';

async function sendAPI(endpoint, method = 'GET', body = null) {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log('📤 جاري الاتصال بـ:', url);

        const options = {
            method: method,
            mode: 'cors', // ✅ مهم جداًً
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        };

        if (body) options.body = JSON.stringify(body);

        const res = await fetch(url, options);
        
        console.log('📥 رد الخادم:', res.status);
        
        if (!res.ok) throw new Error(`خطأ: ${res.status}`);
        const data = await res.json();
        console.log('📥 البيانات:', data);
        return data;

    } catch (err) {
        console.error('❌ خطأ:', err);
        alert(`تعذر الاتصال!\n\nالسبب: ${err.message}\n\n⚠️ تأكد:\n✅ البوت شغال في Discloud\n✅ أضفت إعدادات CORS في server.js\n✅ انتظرت دقيقتين بعد إعادة التشغيل`);
        return null;
    }
}
