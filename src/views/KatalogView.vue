<template>
  <div
    class="min-h-screen bg-cover bg-center flex flex-col items-center px-6 py-10"
    style="background-image: url('/src/assets/images/bg-navy.png')"
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
    <div class="text-center text-white mb-8">
      <h1 class="text-4xl font-katalog font-bold tracking-wide mb-1">KATALOG</h1>
      <p class="text-2xl font-serif">
        Direktori Lengkap Program Pelatihan dan Pengembangan SDM
      </p>
    </div>

    <!-- Kontainer Tabel -->
    <div
      class="bg-white shadow-xl rounded-xl w-full max-w-6xl overflow-hidden font-inter"
    >
      <!-- Filter Atas -->
      <div
        class="flex flex-wrap justify-between items-center p-4 border-b border-gray-200 gap-4"
      >
        <div class="flex items-center space-x-2">
          <label for="year" class="text-sm font-semibold text-gray-700"
            >Tahun:</label
          >
          <select
            id="year"
            class="border border-gray-300 rounded-lg px-2 py-1 text-sm"
          >
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option selected>2025</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search..."
          class="border border-gray-300 rounded-lg px-3 py-1 text-sm w-60"
        />
      </div>

      <!-- Tabel -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th class="px-4 py-3">No</th>
              <th class="px-4 py-3">Nama Pelatihan</th>
              <th class="px-4 py-3">Jenis Pelatihan</th>
              <th class="px-4 py-3">Metode Pelatihan</th>
              <th class="px-4 py-3">Pelaksanaan Pelatihan</th>
              <th class="px-4 py-3">Penyelenggara</th>
              <th class="px-4 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in paginatedData"
              :key="index"
              class="border-b"
            >
              <td class="px-4 py-3">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-4 py-3 font-semibold text-blue-600">
                {{ item.nama }}
              </td>
              <td class="px-4 py-3">{{ item.jenis }}</td>
              <td class="px-4 py-3">{{ item.metode }}</td>
              <td class="px-4 py-3">{{ item.pelaksanaan }}</td>
              <td class="px-4 py-3">{{ item.penyelenggara }}</td>
              <td class="px-4 py-2 border">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  @click="openDetail(item)"
                >
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Pagination -->
      <div
        class="flex justify-between items-center px-4 py-3 border-t text-sm text-gray-600"
      >
        <span>
          Showing 
          {{ (currentPage - 1) * itemsPerPage + 1 }} 
          to 
          {{ Math.min(currentPage * itemsPerPage, pelatihan.length) }} 
          of {{ pelatihan.length }} entries
        </span>
        <div class="flex space-x-2">
          <button 
            class="px-3 py-1 border rounded-lg hover:bg-gray-100"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            &lt;
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="px-3 py-1 border rounded-lg"
            :class="page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button 
            class="px-3 py-1 border rounded-lg hover:bg-gray-100"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            &gt;
          </button>
        </div>
      </div>

    <!-- Modal Detail -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <div class="bg-white w-full max-w-5xl rounded-xl shadow-lg p-8 relative overflow-y-auto max-h-[90vh]">
    <!-- Tombol Close -->
    <button
      @click="showModal = false"
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
    >
      ✕
    </button>

    <!-- Judul -->
    <h2 class="text-2xl font-bold mb-6 text-gray-800 break-words">
      {{ selected.nama }}
    </h2>

    <!-- Grid Card Detail -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Informasi Pelatihan -->
      <div class="bg-blue-50 p-5 rounded-xl border border-blue-200">
        <div class="flex items-center gap-2 mb-2">
          <img src="@/assets/icons/Book.svg" alt="Book" class="h-6 w-6" />
          <h3 class="font-semibold text-blue-800 break-words whitespace-normal">
            Informasi Pelatihan
          </h3>
        </div>
        <p class="break-words whitespace-normal"><b>Metode:</b> {{ selected.metode }}</p>
        <p class="break-words whitespace-normal"><b>Jenis:</b> {{ selected.jenis }}</p>
      </div>

      <!-- Penyelenggara -->
      <div class="bg-purple-50 p-5 rounded-xl border border-purple-200">
        <div class="flex items-center gap-2 mb-2">
          <img src="@/assets/icons/Users.svg" alt="Users" class="h-6 w-6" />
          <h3 class="font-semibold text-purple-800 break-words whitespace-normal">
            Penyelenggara
          </h3>
        </div>
        <p class="break-words whitespace-normal">{{ selected.penyelenggara }}</p>
      </div>

      <!-- Jadwal & Biaya -->
      <div class="bg-green-50 p-5 rounded-xl border border-green-200">
        <div class="flex items-center gap-2 mb-2">
          <img src="@/assets/icons/Calendar.svg" alt="Calendar" class="h-6 w-6" />
          <h3 class="font-semibold text-green-800 break-words whitespace-normal">
            Jadwal & Biaya
          </h3>
        </div>
        <p class="break-words whitespace-normal"><b>Pelaksanaan:</b> {{ selected.pelaksanaan }}</p>
        <p class="break-words whitespace-normal"><b>Estimasi Biaya:</b> {{ selected.estimasi }}</p>
      </div>

      <!-- Tujuan Pelatihan -->
      <div class="bg-orange-50 p-5 rounded-xl border border-orange-200">
        <div class="flex items-center gap-2 mb-2">
          <img src="@/assets/icons/Book-2.svg" alt="Book-2" class="h-6 w-6" />
          <h3 class="font-semibold text-orange-800 break-words whitespace-normal">
            Tujuan Pelatihan
          </h3>
        </div>
        <p class="break-words whitespace-normal">{{ selected.tujuan }}</p>
      </div>

      <!-- Keterangan -->
      <div class="bg-yellow-50 p-5 rounded-xl border border-yellow-200 col-span-1 md:col-span-2">
        <div class="flex items-center gap-2 mb-2">
          <img src="@/assets/icons/Info.svg" alt="Info" class="h-6 w-6" />
          <h3 class="font-semibold text-yellow-800 break-words whitespace-normal">
            Keterangan
          </h3>
        </div>
        <p class="break-words whitespace-normal">{{ selected.keterangan }}</p>
      </div>
    </div>
  </div>
</div>
</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showModal = ref(false);
const selected = ref({});

function openDetail(item) {
  selected.value = item;
  showModal.value = true;
}

// Data
const pelatihan = [
  {
    nama: "Pelatihan Kepemimpinan",
    jenis: "Manajemen dan Leadership",
    metode: "Tatap Muka",
    pelaksanaan: "15–20 Januari 2025",
    penyelenggara: "PT. Mandiri Training Center",
    tujuan: "Pelatihan untuk pengembangan kemampuan kepemimpinan dan manajemen tim",
    estimasi: "Rp 5.000.000",
    keterangan: "Kuota tersedia 15 peserta",
  },
  {
    nama: "Pelatihan Manajemen Proyek",
    jenis: "Manajemen dan Leadership",
    metode: "Online",
    pelaksanaan: "01–05 Februari 2025",
    penyelenggara: "CV. Excellence Project Academy",
    tujuan: "Pelatihan manajemen proyek dengan metodologi PMBOK dan Agile",
    estimasi: "Rp 3.500.000",
    keterangan: "Sertifikat PMP tersedia",
  },
  {
    nama: "Pelatihan Digital Marketing",
    jenis: "Marketing & Sales",
    metode: "Hybrid",
    pelaksanaan: "10-14 Feb 2025",
    penyelenggara: "Digital Marketing Institute Indonesia",
    tujuan: "Pelatihan strategi pemasaran digital, SEO, dan social media marketing",
    estimasi: "Rp 4.200.000",
    keterangan: "Menunggu konfirmasi venue",
  },
  {
    nama: "Pelatihan Data Analytics dengan Python",
    jenis: "Teknologi Informasi",
    metode: "Tatap Muka",
    pelaksanaan: "02-25 Feb 2025",
    penyelenggara: "Digital Marketing Institute Indonesia",
    tujuan: "Pelatihan analisis data menggunakan Python, Pandas, dan visualisasi data",
    estimasi: "Rp 6.500.000",
    keterangan: "Include laptop dan software",
  },
  {
    nama: "Pelatihan Akuntansi Keuangan Dasar",
    jenis: "Keuangan & Akuntansi",
    metode: "Online",
    pelaksanaan: "05-10 Mar 2025",
    penyelenggara: "Institute Keuangan Profesional",
    tujuan: "Pelatihan dasar-dasar akuntansi dan laporan keuangan untuk non-akuntan",
    estimasi: "Rp 2.800.000",
    keterangan: "Materi dalam Bahasa Indonesia",
  },
  {
    nama: "Pelatihan Customer Service Excellence",
    jenis: "Customer Service",
    metode: "Tatap Muka",
    pelaksanaan: "12-14 Mar 2025",
    penyelenggara: "Service Excellence Training Center",
    tujuan: "Pelatihan pelayanan pelanggan terbaik dan penanganan komplain",
    estimasi: "Rp 3.200.000",
    keterangan: "Include role playing session",
  },
  {
    nama: "Pelatihan K3 (Keselamatan dan Kesehatan Kerja)",
    jenis: "Keselamatan Kerja",
    metode: "Hybrid",
    pelaksanaan: "18-22 Mar 2025",
    penyelenggara: "PT. Safety Training Indonesial",
    tujuan: "Pelatihan standar K3 dan implementasi sistem manajemen keselamatan",
    estimasi: "Rp 4.800.000	",
    keterangan: "Sertifikat K3 Umum",
  },
  {
    nama: "	Pelatihan Public Speaking & Presentation",
    jenis: "Soft Skills",
    metode: "Tatap Muka",
    pelaksanaan: "05-10 Mar 2025",
    penyelenggara: "Professional Communication Institute",
    tujuan: "Pelatihan kemampuan berbicara di depan umum dan teknik presentasi efektif",
    estimasi: "Rp 4.000.000",
    keterangan: "Max 20 peserta",
  },
  {
    nama: "Pelatihan Supply Chain Management",
    jenis: "Operations & Supply Chain",
    metode: "Online",
    pelaksanaan: "01-05 Apr 2025",
    penyelenggara: "Supply Chain Excellence Academy",
    tujuan: "Pelatihan manajemen rantai pasok dan optimasi distribusi",
    estimasi: "Rp 3.800.000",
    keterangan: "Ditunda hingga pemberitahuan lebih lanjut",
  },
  {
    nama: "Pelatihan Digital Transformation Strategy",
    jenis: "Teknologi Informasi",
    metode: "Hybrid",
    pelaksanaan: "08-12 Apr 2025",
    penyelenggara: "Digital Transformation Consultancy",
    tujuan: "Pelatihan strategi transformasi digital untuk organisasi modern",
    estimasi: "Rp 7.200.000",
    keterangan: "MMenunggu approval budget",
  },
  {
    nama: "Pelatihan Digital Transformation Strategy",
    jenis: "Teknologi Informasi",
    metode: "Hybrid",
    pelaksanaan: "08-12 Apr 2025",
    penyelenggara: "Digital Transformation Consultancy",
    tujuan: "Pelatihan strategi transformasi digital untuk organisasi modern",
    estimasi: "Rp 7.200.000",
    keterangan: "MMenunggu approval budget",
  },
  {
    nama: "Pelatihan Digital Transformation Strategy",
    jenis: "Teknologi Informasi",
    metode: "Hybrid",
    pelaksanaan: "08-12 Apr 2025",
    penyelenggara: "Digital Transformation Consultancy",
    tujuan: "Pelatihan strategi transformasi digital untuk organisasi modern",
    estimasi: "Rp 7.200.000",
    keterangan: "MMenunggu approval budget",
  },
  
];

// --- Pagination ---
const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalPages = computed(() => {
  return Math.ceil(pelatihan.length / itemsPerPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return pelatihan.slice(start, start + itemsPerPage.value);
});

</script>

<style>
:root {
  font-family: "Poppins", sans-serif;
}
</style>