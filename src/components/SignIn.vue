<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { insforge } from '../lib/insforgeClient'   // ← Agregado para usar autenticación real

const fullname = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const register = async (e) => {
  e.preventDefault()

  if (password.value.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    const { error } = await insforge.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          fullname: fullname.value,
          username: username.value
        }
      }
    })

    if (error) throw error

    alert(`¡Registro exitoso!\n\nBienvenido, ${fullname.value} 🎉`)
    
    // Volvemos al login (ruta raíz)
    setTimeout(() => {
      router.push('/')
    }, 1500)

  } catch (error) {
    alert('Error al registrarse: ' + error.message)
  }
}
</script>

<template>
  <main>
    <div class="register-container">
      <!-- Logo -->
      <div class="logo-container">
        <img src="/src/assets/img/mascota.png" alt="TailScan" class="dog-icon" />
        <h1 class="title">TailScan</h1>
      </div>

      <h2 class="subtitle">Crear Cuenta</h2>

      <form @submit="register">
        <div class="input-group">
          <label>Nombre completo</label>
          <input v-model="fullname" type="text" placeholder="Juan Pérez" required>
        </div>

        <div class="input-group">
          <label>Usuario</label>
          <input v-model="username" type="text" placeholder="admin" required>
        </div>

        <div class="input-group">
          <label>Correo electrónico</label>
          <input v-model="email" type="email" placeholder="tu@email.com" required>
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="Ingresa tu contraseña" required>
        </div>

        <div class="input-group">
          <label>Confirmar contraseña</label>
          <input v-model="confirmPassword" type="password" placeholder="Confirma tu contraseña" required>
        </div>

        <button type="submit" class="btn-login">
          🐾 Registrarse
        </button>
      </form>

      <div class="footer-links">
        <p>¿Ya tienes cuenta? <router-link to="/">Iniciar sesión</router-link></p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Tu estilo actual está muy bueno, solo agrego la imagen del perro */
.dog-icon {
  width: 80px;
  height: auto;
  margin-bottom: 10px;
}

/* El resto de tus estilos se mantienen igual */
main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #40E0D0, #FF8C42);
  padding: 20px;
}

</style>