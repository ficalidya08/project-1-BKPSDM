<template>
  <div
  class="min-h-screen bg-cover bg-center flex flex-col items-center px-6 py-10"
  style="background-image: url('/src/assets/images/bg-white-navy.png')"
>

    <!-- Tombol kembali pojok kiri atas -->
    <router-link 
      to="/" 
      class="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-800 hover:bg-gray-100 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke-width="2" 
           stroke="currentColor" 
           class="w-6 h-6">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M15 19l-7-7 7-7" />
      </svg>
      <span class="text-base font-medium">Kembali ke Home</span>
    </router-link>

    <!-- Container logo -->
<div class="flex items-center justify-center gap-2">
  <!-- Logo BKPSDM -->
  <img
    src="@/assets/images/logo/bkpsdm.png"
    alt="Logo BKPSDM"
    class="h-[70px] w-auto"
  />

  <!-- Logo utama -->
  <img
    src="@/assets/images/logo/logo.png"
    alt="Logo Utama"
    class="h-[140px] w-auto"
  />
</div>

    <!-- Judul -->
    <div class="text-center text-black mb-8">
      <h1 class="text-4xl font-katalog font-bold tracking-wide mb-1">DIREKTORI</h1>
      <p class="text-2xl font-serif">
        Direktori Lengkap Program Pelatihan dan Pengembangan SDM
      </p>
    </div>
    </div>
    </template>