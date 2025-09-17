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

    <!-- Kontainer Tabel -->
  <div class="bg-white shadow-xl rounded-xl w-full max-w-6xl overflow-hidden">

    <!-- Filter Atas -->
    <div class="flex flex-wrap justify-between items-center p-4 border-b border-gray-200 gap-4">
      <!-- Dropdown Tahun -->
<div class="flex items-center space-x-2">
  <label for="year" class="text-sm font-semibold text-gray-700">Tahun:</label>
  <select
    id="year"
    class="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
    v-model="selectedYear"
  >
    <option value="">Semua</option>
    <option v-for="tahun in years" :key="tahun" :value="tahun">{{ tahun }}</option>
  </select>
</div>


      <!-- Search -->
      <input
        type="text"
        placeholder="Search..."
        v-model="searchQuery"
        class="border border-gray-300 rounded-lg px-3 py-1 text-sm w-60 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Tabel -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 text-xs uppercase">
          <tr>
            <th class="px-4 py-3">No</th>
            <th class="px-4 py-3">Judul Laporan</th>
            <th class="px-4 py-3">Hasil Pelatihan</th>
            <th class="px-4 py-3">Total Biaya</th>
            <th class="px-4 py-3">File Sertifikat</th>
            <th class="px-4 py-3">File Laporan</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="index"
            class="border-b hover:bg-gray-50 even:bg-gray-50"
          >
            <td class="px-4 py-3">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="px-4 py-3 text-blue-600 font-medium">{{ item.judul }}</td>
            <td class="px-4 py-3">{{ item.hasil }}</td>
            <td class="px-4 py-3">{{ item.biaya }}</td>
            <td class="px-4 py-3">
              <a :href="item.sertifikat" target="_blank" class="text-blue-600 underline">
                {{ item.sertifikat.split('/').pop() }}
              </a>
            </td>
            <td class="px-4 py-3">
              <a :href="item.laporan" target="_blank" class="text-blue-600 underline">
                {{ item.laporan.split('/').pop() }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer Pagination -->
    <div class="flex justify-between items-center px-4 py-3 border-t text-sm text-gray-600">
      <span>
      Showing 
      {{ (currentPage - 1) * itemsPerPage + 1 }} 
      to 
      {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} 
      of {{ filteredData.length }} entries
    </span>

      <div class="flex space-x-2">
        <button
          class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
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
          class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Tahun filter
const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const selectedYear = ref(""); // default kosong = semua


// Search
const searchQuery = ref("");

// Data Laporan
const pelatihan = [
  {
    judul: "Laporan Pelatihan Kepemimpinan Strategis Tingkat Menegah 2024",
    hasil: "Lulus",
    biaya: "Rp 125.000.000",
    sertifikat: "/files/laporan_kepemimpinan_strategis_2024.pdf",
    laporan: "/files/laporan_ks_2024.pdf",
    tahun: 2024,
  },
  {
    judul: "Laporan Training Digital Transformation Aparatur Sipil Negara",
    hasil: "Revisi",
    biaya: "Rp 75.000.000",
    sertifikat: "/files/laporan_digital_2024.pdf",
    laporan: "/files/laporan_dt_2024.pdf",
    tahun: 2024,
  },
  {
    judul: "Laporan Sertifikasi ISO 9001:2015 Quality Management System",
    hasil: "Revisi",
    biaya: "Rp 85.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Pelatihan Manajemen Keuangan Publik dan Anggaran Negara",
    hasil: "Lulus",
    biaya: "Rp 100.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Workshop Data Analytics dan Business Intelligenc",
    hasil: "Revisi",
    biaya: "Rp 115.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Pelatihan Project Management Professional (PMP) Certification",
    hasil: "Lulus",
    biaya: "Rp 95.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Sertifikasi COBIT 2019 IT Governance Framework",
    hasil: "Revisi",
    biaya: "Rp 165.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Pelatihan Audit Internal dan Risk Management",
    hasil: "Lulus",
    biaya: "Rp 100.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Training Cybersecurity Awareness dan Digital Security",
    hasil: "Revisi",
    biaya: "Rp 140.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Pelatihan Sistem Manajemen Mutu ISO 9001",
    hasil: "Revisi",
    biaya: "Rp 55.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  {
    judul: "Laporan Workshop Machine Learning dan Artificial Intelligence",
    hasil: "Lulus",
    biaya: "Rp 85.000.000",
    sertifikat: "/files/laporan_digital_2025.pdf",
    laporan: "/files/laporan_dt_2025.pdf",
    tahun: 2025,
  },
  
];

// Pagination


const currentPage = ref(1);
const itemsPerPage = ref(10);

const filteredData = computed(() => {
  return pelatihan.filter((item) => {
    const matchYear =
      selectedYear.value === "" || item.tahun === parseInt(selectedYear.value);

    const matchSearch =
      searchQuery.value === "" ||
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      );

    return matchYear && matchSearch;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredData.value.slice(start, start + itemsPerPage.value);
});
</script>

<style>
:root {
  font-family: "Poppins", sans-serif;
}
</style>