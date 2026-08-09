const API_BASE_URL = 'https://timeout-appeals.discloud.app/api';
const API_KEY = 'P16yie33Q2110pE-5bMAahtL2CmpK6Q-Abc123!XyZ987@';

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
        
        console.log('📤 جاري الإرسال:', API_BASE_URL + endpoint);
        const res = await fetch(API_BASE_URL + endpoint, options);
        
        if (!res.ok) throw new Error(`خطأ: ${res.status}`);
        const data = await res.json();
        console.log('📥 الرد من البوت:', data);
        return data;
    } catch (err) {
        console.error('❌ خطأ في الاتصال:', err);
        alert('تعذر الاتصال بالبوت!\n\nتحقق من:\n✅ رابط البوت صحيح\n✅ البوت شغال في Discloud\n✅ كلمة السر متطابقة\n\n' + err.message);
        return null;
    }
}
