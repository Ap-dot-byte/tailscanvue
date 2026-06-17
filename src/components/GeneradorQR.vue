<script setup>
import { ref } from 'vue'
import QRCode from 'qrcode'

const nombre = ref('')
const contacto = ref('')
const preview = ref('')
const qrCanvas = ref(null)

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      preview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const crearQR = async () => {
  if (!qrCanvas.value) return

  const data = `Nombre: ${nombre.value}\nContacto: ${contacto.value}`

  try {
    await QRCode.toCanvas(qrCanvas.value, data, {
      width: 256,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' }
    })
  } catch (err) {
    console.error('Error al generar QR:', err)
  }
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Formulario de Registro</h1>
    </header>

    <form @submit.prevent>
      <label>Nombre</label>
      <input v-model="nombre" type="text" placeholder="Ingrese su nombre" required>

      <label>Contacto</label>
      <input v-model="contacto" type="text" placeholder="Teléfono o email" required>

      <label>Toque para añadir una imagen</label>
      <input type="file" accept="image/*" @change="onImageChange">

      <div class="preview">
        <img v-if="preview" :src="preview" alt="Vista previa" />
        <span v-else>Vista previa</span>
      </div>

      <button type="button" @click="crearQR">Crear QR</button>

      <div class="qr-container">
        <canvas ref="qrCanvas"></canvas>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffdd66, #ff9966);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  color: white;
  font-size: 2.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

form {
  background: white;
  color: #333;
  width: 100%;
  max-width: 420px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

label {
  font-weight: bold;
  color: #ff6600;
  margin-bottom: 5px;
}

input[type="text"],
input[type="file"] {
  padding: 14px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  background: white;
}

input[type="text"]:focus,
input[type="file"]:focus {
  outline: none;
  border-color: #ffaa00;
  box-shadow: 0 0 0 3px rgba(255, 170, 0, 0.2);
}

.preview {
  border: 2px dashed #ffaa00;
  border-radius: 15px;
  min-height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  overflow: hidden;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

button {
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 180, 219, 0.4);
}

.qr-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 12px;
}
</style>