// ─── رابط البوت على Discloud ───────────────────────
const API_BASE_URL = 'https://timeout-appeals.discloud.app/api';

// ─── كلمة السر (نفسها في ملف .env في البوت) ───────
const API_KEY = 'P16yie33Q2110pE-5bMAahtL2CmpK6Q-Abc123!XyZ987@';

// ─── دالة إرسال الطلبات للبوت ───────────────────────
async function sendAPI(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`خطأ في الرابط: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('❌ خطأ في الاتصال:', error);
        alert(`تعذر الاتصال بالبوت!\n\nالسبب: ${error.message}\n\nتأكد من:\n✅ البوت شغال في Discloud\n✅ الرابط صحيح\n✅ كلمة السر متطابقة`);
        return null;
    }
}

// ─── دوال مساعدة ──────────────────────────────────────
async function checkBotStatus() {
    return await sendAPI('/status');
}

async function checkAuth() {
    return await sendAPI('/auth-check');
}

async function loadSettings() {
    return await sendAPI('/settings');
}

async function saveSettings(newSettings) {
    return await sendAPI('/update-settings', 'POST', newSettings);
}
