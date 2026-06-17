<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { insforge } from '../lib/insforgeClient'

const user = ref('')
const password = ref('')
const router = useRouter()

// Login con Google o GitHub
const socialLogin = async (provider) => {
  try {
    const { error } = await insforge.auth.signInWithOAuth({
      provider: provider,
    })
    if (error) throw error
  } catch (error) {
    alert('Error al iniciar sesión con ' + provider + ': ' + error.message)
  }
}

// Login tradicional
const login = async () => {
  try {
    const { error } = await insforge.auth.signInWithPassword({
      email: user.value,
      password: password.value,
    })
    
    if (error) throw error
    
    alert('¡Bienvenido de nuevo!')
    router.push('/home')
  } catch (error) {
    alert('Error en usuario o contraseña: ' + error.message)
  }
}
</script>

<template>
  <main>
    <div class="login-container">
      <div class="logo-container">
        <img src="/src/assets/img/mascota.png" alt="TailScan" class="dog-icon" />
        <h1 class="title">TailScan</h1>
      </div>

      <h2 class="login-heading">Iniciar Sesión</h2>

      <form @submit.prevent="login">
        <div class="input-group">
          <label>Usuario (Email)</label>
          <div class="input-wrapper">
            <input v-model="user" type="email" placeholder="Ingresa tu email" required />
          </div>
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <div class="input-wrapper">
            <input v-model="password" type="password" placeholder="Ingresa tu contraseña" required />
          </div>
        </div>

        <button type="submit" class="btn-login">Ingresar</button>
      </form>

      <div class="social-login" style="margin-top: 20px;">
        <button type="button" @click="socialLogin('google')" class="btn-login" style="background: #db4437; margin-bottom: 10px;">
          Entrar con Google
        </button>
        <button type="button" @click="socialLogin('github')" class="btn-login" style="background: #333;">
          Entrar con GitHub
        </button>
      </div>

      <div class="footer-links" style="margin-top: 25px;">
        <a href="#">¿Olvidaste tu contraseña?</a><br>
        <router-link to="/signin">¿No tienes cuenta? Regístrate</router-link>
      </div>
    </div>
  </main>
</template>

<style>
* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

body { 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #5CE1E6 0%, #FF9F6B 100%);
  min-height: 100vh; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  color: #333; 
}

main { 
  display: flex;
  align-items: center; 
  justify-content: center; 
  width: 100%; 
}

.login-container { 
  background: rgba(255, 255, 255, 0.96); 
  backdrop-filter: blur(16px); 
  padding: 50px 45px; 
  border-radius: 24px; 
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18); 
  width: 100%; 
  max-width: 420px; 
  text-align: center; 
  animation: fadeIn 0.8s ease-in-out; 
  margin: auto; 
}

.logo-container { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  margin-bottom: 25px; 
}

.title { 
  font-size: 34px; 
  font-weight: 700; 
  background: linear-gradient(90deg, #FF6A3D, #FFB800); 
  background-clip: text; 
  -webkit-background-clip: text; 
  color: transparent; 
}

.dog-icon { 
  width: 80px; 
  height: auto; 
  margin-bottom: 15px; 
}

.login-heading { 
  color: #FF6A3D; 
  margin-bottom: 35px; 
  font-size: 26px; 
  font-weight: 600; 
}

.input-group { 
  margin-bottom: 22px; 
  text-align: left; 
}

.input-group label { 
  font-weight: 600; 
  color: #333232; 
  margin-bottom: 8px; 
  display: block; 
}

.input-wrapper input { 
  width: 100%; 
  padding: 14px; 
  border-radius: 14px; 
  border: 2px solid #a59f9f; 
  transition: border-color 0.3s ease;
  background: #eee; 
}

.btn-login { 
  width: 100%; 
  padding: 16px; 
  background: linear-gradient(90deg, #FF6A3D, #FFB800); 
  color: white; 
  font-weight: 600; 
  border: none; 
  border-radius: 50px; 
  cursor: pointer; 
  transition: transform 0.2s ease, box-shadow 0.2s ease; 
  margin-bottom: 10px; 
}
.btn-login:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 20px rgba(255, 106, 61, 0.4); 
}
.footer-links a { 
  color: #FF6A3D; 
  text-decoration: none; 
}
@keyframes fadeIn { 
  from { opacity: 0; 
  transform: translateY(20px); } to { 
    opacity: 1; 
    transform: translateY(0); 
    } 
  }
</style>