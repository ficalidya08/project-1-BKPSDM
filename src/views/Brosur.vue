<template>
  <div
  class="min-h-screen bg-cover bg-center flex flex-col items-center px-6 py-10"
  style="background-image: url('/src/assets/images/bg-white.png')"
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

    <!-- Logo -->
    <img
      src="@/assets/images/logo/logo.png"
      alt="Logo BKPSDM"
      class="mx-auto h-[90px] w-auto mb-6"
    />

    <!-- Judul -->
    <div class="text-center text-black mb-10">
      <h1 class="text-4xl font-katalog font-bold tracking-wide">Brosur</h1>
      <p class="text-2xl font-serif">
        Pusat Informasi Pelatihan dan Pengembangan
      </p>
    </div>

    <!-- Kontainer Tabel -->
    <div
      class="bg-white shadow-xl rounded-xl w-full max-w-6xl overflow-hidden"
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
        <th class="px-4 py-3">Nama Brosur</th>
        <th class="px-4 py-3">Nama Penyelenggara</th>
        <th class="px-4 py-3">Nomor Surat</th>
        <th class="px-4 py-3">Tanggal Surat</th>
        <th class="px-4 py-3">File Surat</th>
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
    <td class="px-4 py-3">{{ item.penyelenggara }}</td>
    <td class="px-4 py-3">{{ item.nomor }}</td>
    <td class="px-4 py-3">{{ item.tanggal }}</td>
    <td class="px-4 py-3 text-blue-600 underline cursor-pointer">
      <a :href="item.file" target="_blank">Lihat File</a>
    </td>
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
        <span>Showing 1 to 10 of 47 entries</span>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border rounded-lg hover:bg-gray-100">
            &lt;
          </button>
          <button
            class="px-3 py-1 border rounded-lg bg-blue-600 text-white"
          >
            1
          </button>
          <button class="px-3 py-1 border rounded-lg hover:bg-gray-100">
            2
          </button>
          <button class="px-3 py-1 border rounded-lg hover:bg-gray-100">
            3
          </button>
          <button class="px-3 py-1 border rounded-lg hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    </div>
    <!-- Modal Detail -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <div class="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-8 relative">
    <!-- Tombol Close -->
    <button
      @click="showModal = false"
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
    >
      ✕
    </button>

    <!-- Judul -->
    <h2 class="text-2xl font-bold mb-8 text-gray-900">
      Brosur Pelatihan Kepemimpinan Strategis 2024
    </h2>

    <!-- Grid Card Detail -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Informasi Penyelenggara -->
      <div class="bg-blue-50 border border-blue-200 p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-3">
          <img src="@/assets/icons/Book.svg" alt="Penyelenggara" class="h-6 w-6" />
          <h3 class="font-semibold text-blue-800">Informasi Penyelenggara</h3>
        </div>
        <p class="font-medium">{{ selected.penyelenggara }}</p>
        <p class="text-sm text-gray-700 flex items-center gap-1 mt-1">
          <img src="@/assets/icons/Map.svg" class="h-4 w-4" alt="alamat" />
          Jl. Veteran No. 10, Jakarta Pusat
        </p>
      </div>

      <!-- Informasi Kontak -->
      <div class="bg-purple-50 border border-purple-200 p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-3">
          <img src="@/assets/icons/Users.svg" alt="Kontak" class="h-6 w-6" />
          <h3 class="font-semibold text-purple-800">Informasi Kontak</h3>
        </div>
        <p class="font-medium">Ahmad Rizki Pratama</p>
        <p class="text-sm text-gray-700">0812-3456-7890</p>
      </div>

      <!-- Informasi Dokumen -->
      <div class="bg-green-50 border border-green-200 p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-3">
          <img src="@/assets/icons/Calendar.svg" alt="Dokumen" class="h-6 w-6" />
          <h3 class="font-semibold text-green-800">Informasi Dokumen</h3>
        </div>
        <p class="text-sm">
          <b>No. Surat:</b> {{ selected.nomor }}
        </p>
        <p class="text-sm">
          <b>Tanggal Surat:</b> {{ selected.tanggal }}
        </p>
      </div>

      <!-- File Brosur -->
      <div class="bg-orange-50 border border-orange-200 p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-3">
          <img src="@/assets/icons/Buku.svg" alt="File" class="h-6 w-6" />
          <h3 class="font-semibold text-orange-800">File Brosur</h3>
        </div>
        <p class="text-sm mb-3">{{ selected.file.split('/').pop() }}</p>
        <div class="flex gap-3">
          <a
            :href="selected.file"
            target="_blank"
            class="px-4 py-2 text-sm rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-100 transition"
          >
            Preview File
          </a>
          <a
            :href="selected.file"
            download
            class="px-4 py-2 text-sm rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition"
          >
            Download File
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</Template>

<script setup>
import { ref, computed } from "vue";

const showModal = ref(false);
const selected = ref({});
const currentPage = ref(1);
const itemsPerPage = 10; // jumlah data per halaman

function openDetail(item) {
  selected.value = item;
  showModal.value = true;
}

// Data brosur
const pelatihan = [
  {
    nama: "Pelatihan Kepemimpinan Strategis 2024",
    penyelenggara: "LAN (Lembaga Administrasi Negara)",
    nomor: "002/LAN/2024",
    tanggal: "15 Januari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Training Digital Transformation",
    penyelenggara: "PT Edukasi Teknologi Indonesia",
    nomor: "002/LAN/2024",
    tanggal: "20 Januari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Sertifikasi ISO 9001:2015",
    penyelenggara: "Consultant Group Indonesia",
    nomor: "002/LAN/2024",
    tanggal: "25 Januari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Pelatihan Manajemen Keuangan Publik",
    penyelenggara: "BKN (Badan Kepegawaian Negara",
    nomor: "002/LAN/2024",
    tanggal: "25 Januari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Workshop Data Analytics",
    penyelenggara: "Institut Teknologi Bandung",
    nomor: "002/LAN/2025",
    tanggal: "25 Januari 2024",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
   {
    nama: "Brosur Pelatihan Project Management Professional",
    penyelenggara: "PT Manajemen Proyek Nusantara",
    nomor: "002/LAN/2024",
    tanggal: "25 Januari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Sertifikasi COBIT 2019",
    penyelenggara: "Asosiasi IT Governance Indonesia",
    nomor: "002/LAN/2024",
    tanggal: "08 Februari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Pelatihan Audit Internal",
    penyelenggara: "BPKP (Badan Pengawasan Keuangan dan Pembangunan)",
    nomor: "002/LAN/2024",
    tanggal: "12 Februari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Training Cybersecurity Awareness",
    penyelenggara: "PT Keamanan Siber Indonesia",
    nomor: "002/LAN/2024",
    tanggal: "15 Februari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
  {
    nama: "Brosur Pelatihan Sistem Manajemen Mutu",
    penyelenggara: "Universitas Gajah Mada",
    nomor: "002/LAN/2024",
    tanggal: "18 Februari 2025",
    file: "/files/brosur_kepemimpinan_strategis_2024.pdf",
  },
];

// data sesuai halaman aktif
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return pelatihan.slice(start, start + itemsPerPage);
});

// navigasi halaman
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

</script>

<style>
:root {
  font-family: "Poppins", sans-serif;
}
</style>