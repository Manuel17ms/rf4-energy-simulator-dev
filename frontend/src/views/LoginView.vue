<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const remember = ref(false);

const submit = async () => {
  await auth.login(email.value, password.value);
  if (auth.token) router.push('/'); // o /result
};

const googleLogin = () => {
  // TODO: OAuth (per ora placeholder)
  alert('Google login: da implementare (OAuth2).');
};
</script>

<template>
  <div class="page">
    <div class="logo">
      <div class="logoText">TnEnergy</div>
    </div>

    <div class="unitnBadge" aria-hidden="true"></div>

    <div class="card">
      <h1>Login</h1>

      <input v-model="email" type="text" placeholder="Username" class="field" />
      <input v-model="password" type="password" placeholder="Password" class="field" />

      <div class="row">
        <label class="remember">
          <input type="checkbox" v-model="remember" />
          <span>Remember Me</span>
        </label>
        <a class="link" href="#" @click.prevent>Forgotten password?</a>
      </div>

      <button class="btnPrimary" @click="submit" :disabled="auth.loading">
        {{ auth.loading ? '...' : 'Login' }}
      </button>

      <button class="btnGoogle" @click="googleLogin">
        <span>Accedi con google</span>
        <span class="g">G</span>
      </button>

      <div class="divider">
        <div class="small">Otherwise</div>
        <a class="link" href="#" @click.prevent>Create new account</a>
      </div>

      <button class="btnSignup" @click="router.push('/signup')">Sign up</button>

      <p v-if="auth.error" class="error">{{ auth.error }}</p>
    </div>
  </div>
</template>

<style scoped>
.page{
  min-height:100vh;
  background:#2f6f2f;
  display:flex;
  align-items:center;
  justify-content:center;
  font-family: Arial, sans-serif;
  position:relative;
  padding:40px;
}

.logo{
  position:absolute;
  top:20px;
  left:20px;
  width:110px;
  height:110px;
  border-radius:50%;
  background:#e7f6e7;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#2f6f2f;
  font-weight:700;
}

.unitnBadge{
  position:absolute;
  top:20px;
  right:20px;
  width:90px;
  height:90px;
  border-radius:50%;
  border:2px solid rgba(0,0,0,0.2);
  opacity:.25;
}

.card{
  width:420px;
  background:rgba(255,255,255,0.06);
  border-radius:18px;
  padding:36px 34px;
  color:#f4fff4;
}

h1{
  text-align:center;
  font-size:48px;
  font-weight:300;
  margin:0 0 22px;
}

.field{
  width:100%;
  padding:12px 14px;
  border:none;
  border-radius:8px;
  background:#e7f6e7;
  margin:10px 0;
  outline:none;
}

.row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin:10px 0 18px;
  font-size:12px;
}

.remember{
  display:flex;
  gap:8px;
  align-items:center;
  opacity:.95;
}

.link{
  color:#e7f6e7;
  text-decoration:none;
  opacity:.95;
}

.btnPrimary{
  width:100%;
  padding:14px 16px;
  border:none;
  border-radius:999px;
  background:#e7f6e7;
  color:#2f6f2f;
  font-weight:700;
  cursor:pointer;
  margin-top:4px;
}

.btnGoogle{
  width:100%;
  margin-top:14px;
  padding:12px 16px;
  border:none;
  border-radius:6px;
  background:#e7f6e7;
  color:#2f6f2f;
  font-weight:600;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:14px;
}

.btnGoogle .g{
  width:34px;
  height:34px;
  border-radius:50%;
  background:white;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-weight:900;
  color:#ea4335;
}

.divider{
  text-align:center;
  margin:16px 0;
  opacity:.95;
  font-size:12px;
}

.small{ margin-bottom:6px; }

.btnSignup{
  width:100%;
  padding:14px 16px;
  border:none;
  border-radius:999px;
  background:#f2b400;
  color:#1f2a1f;
  font-weight:800;
  cursor:pointer;
}

.error{
  margin-top:12px;
  color:#ffd0d0;
  font-size:13px;
  text-align:center;
}
</style>
