<script setup>
import { onMounted, ref } from 'vue'
import { insforge } from '../lib/insforgeClient'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

// Verificar sesión al cargar
onMounted(async () => {
  const { data } = await insforge.auth.getSession()
  user.value = data.session?.user || null

  // Opcional: Redirigir si no hay sesión
  if (!user.value) {
    router.push('/')
  }
})

const goToGeneradorQR = () => {
  router.push('/generador-qr')
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <img
        src="/src/assets/img/mascota.png"
        alt="TailScan"
      />
      <h1>TailScan</h1>
    </div>

    <nav class="navbar">
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#" @click.prevent="goToGeneradorQR">Registrar Mascota</a></li>
        <li><a href="#">Adoptar</a></li>
        <li><a href="#">Servicios</a></li>
      </ul>
    </nav>
  </header>

  <!-- Hero -->
  <section class="hero">
    <h2>¡Bienvenido/a a TailScan! 🐾</h2>

    <p>
      Nos alegra tenerte aquí. Registra a tu mascota con QR, adopta un nuevo compañero,
      accede a servicios profesionales y ayuda a reportar animales perdidos.
    </p>

    <p>
      Cada cola merece ser feliz. Gracias por formar parte de esta comunidad llena de amor y huellitas.
    </p>

    <div class="buttons">
      <button class="btn-primary">
        🐾 Adoptar Ahora
      </button>

      <button class="btn-secondary" @click="goToGeneradorQR">
        📱 Registrar Mascota (Generar QR)
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Mantengo tu estilo original (solo quité lo innecesario) */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:global(body) {
  text-align: center;
  background: linear-gradient(135deg, #5CE1E6 0%, #FF9F6B 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.7;
  min-height: 100vh;
  color: #333;
}

</style>