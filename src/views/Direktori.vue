<template>
  <div
    class="min-h-screen bg-cover bg-center flex flex-col items-center px-6 py-10"
    style="background-image: url('/src/assets/images/bg-white-navy.png')"
  >
    <!-- Tombol kembali -->
    <router-link 
      to="/" 
      class="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-800 hover:bg-gray-100 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           fill="none" viewBox="0 0 24 24" stroke-width="2" 
           stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="text-base font-medium">Kembali ke Home</span>
    </router-link>

    <!-- Logo -->
    <div class="flex items-center justify-center gap-2">
      <img src="@/assets/images/logo/bkpsdm.png" alt="Logo BKPSDM" class="h-[70px] w-auto"/>
      <img src="@/assets/images/logo/logo.png" alt="Logo Utama" class="h-[140px] w-auto"/>
    </div>

    <!-- Judul -->
    <div class="text-center text-black mb-8">
      <h1 class="text-4xl font-katalog font-bold tracking-wide mb-1">DIREKTORI PELATIHAN</h1>
      <p class="text-xl font-serif">Pusat Informasi Pelatihan dan Pengembangan</p>
    </div>

    <!-- Kontainer Tabel -->
    <div class="bg-white shadow-xl rounded-xl w-full max-w-6xl overflow-hidden">

      <!-- Filter -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-4 border-b border-gray-200">
        <!-- KIRI: Dropdown Tahun -->
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

        <!-- KANAN: Filter + Search (Nempel) -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <!-- Dropdown Filter -->
          <select
            v-model="selectedFilter"
            class="border border-gray-300 rounded-lg px-3 py-1 text-sm w-full sm:w-auto"
          >
            <option value="">Semua Kolom</option>
            <option value="judul">Judul Laporan</option>
            <option value="biodata">Biodata Penulis</option>
            <option value="latar">Latar Belakang</option>
          </select>

          <!-- Input Search -->
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            class="border border-gray-300 rounded-lg px-3 py-1 text-sm w-full sm:w-60"
          />
        </div>
      </div>

      <!-- Tabel -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th class="px-4 py-3">No</th>
              <th class="px-4 py-3">Judul Laporan</th>
              <th class="px-8 py-6">Foto</th>
              <th class="px-4 py-3">Biodata Penulis</th>
              <th class="px-4 py-3">Latar Belakang</th>
              <th class="px-4 py-3">File Laporan</th>
              <th class="px-4 py-3">Detail</th>
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
              <td class="px-4 py-3 font-semibold text-blue-600">{{ item.judul }}</td>
              <td class="px-4 py-3">
                <img :src="item.foto" alt="foto penulis" class="h-12 w-12 object-cover rounded-full"/>
              </td>
              <td class="px-4 py-3 text-800 font-medium">{{ item.biodata }}</td>
              <td class="px-4 py-3">{{ item.latar }}</td>
              <td class="px-4 py-3">
                <a :href="item.laporan" target="_blank" class="text-blue-600 underline">
                  {{ item.laporan.split('/').pop() }}
                </a>
              </td>
              <td class="px-4 py-3">
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
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 py-3 border-t text-sm text-600">
        <span class="text-center sm:text-left">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} 
          to {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} 
          of {{ filteredData.length }} entries
        </span>

        <div class="flex flex-wrap justify-center sm:justify-end gap-2">
          <button class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                  :disabled="currentPage === 1"
                  @click="currentPage--">
            &lt;
          </button>
          <button v-for="page in totalPages" :key="page"
                  class="px-3 py-1 border rounded-lg"
                  :class="page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
                  @click="currentPage = page">
            {{ page }}
          </button>
          <button class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                  :disabled="currentPage === totalPages"
                  @click="currentPage++">
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Detail -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins"
    >
      <div class="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-8 relative max-h-[90vh]">
        <!-- Tombol Close -->
        <button
          @click="showModal = false"
          class="absolute top-4 right-4 text-400 hover:text-700 text-xl z-10"
        >
          ✕
        </button>

        <!-- Konten scrollable -->
        <div class="overflow-y-auto pr-2 max-h-[80vh]">
          <!-- Judul -->
          <h2 class="text-2xl font-bold mb-6 text-gray-800 break-words">
            {{ selected.judul }}
          </h2>

          <!-- Grid Foto + Biodata -->
          <div class="flex flex-col md:flex-row gap-6 mb-8">
            <!-- Foto -->
            <div class="flex-shrink-0">
              <div class="w-56 h-64 bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  v-if="selected.foto"
                  :src="selected.foto"
                  alt="Foto Penulis"
                  class="w-full h-full object-cover rounded-lg"
                />
                <span v-else class="text-800 text-sm">Foto</span>
              </div>
            </div>

            <!-- Biodata -->
            <div class="flex-1 bg-purple-50 border border-purple-200 p-6 rounded-xl">
              <div class="flex items-center gap-2 mb-4">
                <h3 class="font-semibold text-purple-600 leading-none">
                  Biodata Penulis
                </h3>
              </div>

              <div class="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p class="font-semibold text-gray-900">Nama Penulis:</p>
                  <p class="text-gray-700 break-words whitespace-normal">{{ selected.namaPenulis }}</p>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Organisasi:</p>
                  <p class="text-gray-700 break-words whitespace-normal">{{ selected.organisasi }}</p>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Jabatan:</p>
                  <p class="text-gray-700 break-words whitespace-normal">{{ selected.jabatan }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Latar + File -->
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-green-50 border border-green-200 p-6 rounded-xl w-full">
              <h3 class="font-semibold text-green-800 mb-2">Latar Belakang</h3>
              <p class="text-700 text-sm leading-relaxed">
                {{ selected.latarBelakang }}
              </p>
            </div>

            <div class="bg-orange-50 border border-orange-200 p-6 rounded-xl w-full">
              <h3 class="font-semibold text-orange-800 mb-2">File Laporan</h3>
              <p class="text-sm text-700 mb-6">
                Nama File: <span class="font-medium">{{ selected.namaFile }}</span>
              </p>
              <div class="flex gap-3">
                <a :href="selected.linkFile" target="_blank" class="px-4 py-2 text-sm rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-100 transition">Preview File</a>
                <a :href="selected.linkFile" download class="px-4 py-2 text-sm rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition">Download File</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const selectedYear = ref("");
const searchQuery = ref("");
const selectedFilter = ref("");

// Data tabel
const pelatihan = [
  {
    judul: "Implementasi Sistem Kepemimpinan Digital",
    foto: "/src/assets/images/logo/bkpsdm.png",
    biodata: "Dr. Ahmad Wijaya, M.Si",
    latar: "Transformasi kepemimpinan digital di era modern",
    laporan: "/files/laporan_iso_9001_2024.pdf",
    tahun: 2024,
    namaPenulis: "Dr. Ahmad Wijaya, M.Si",
    organisasi: "Dinas Pendidikan Provinsi DKI Jakarta",
    jabatan: "Kepala Dinas Pendidikan",
    latarBelakang: "Laporan ini mengkaji implementasi...",
    namaFile: "laporan_iso_9001_2024.pdf",
    linkFile: "/files/laporan_iso_9001_2024.pdf",
  },
  {
    judul: "Strategi Digital Transformation",
    foto: "/src/assets/images/logo/logo.png",
    biodata: "Sari Indrawati, S.Kom, M.T",
    latar: "Laporan menganalisis strategi digital...",
    laporan: "/files/laporan_strategis_2025.pdf",
    tahun: 2025,
    namaPenulis: "Sari Indrawati, S.Kom, M.T",
    organisasi: "BKPSDM",
    jabatan: "Kepala Bidang Transformasi Digital",
    latarBelakang: "Kajian strategi digital...",
    namaFile: "laporan_strategis_2025.pdf",
    linkFile: "/files/laporan_strategis_2025.pdf",
  },
];

// State modal
const showModal = ref(false);
const selected = ref({});

const currentPage = ref(1);
const itemsPerPage = ref(10);

// --- Filtering ---
const filteredData = computed(() => {
  return pelatihan.filter((item) => {
    const matchYear = selectedYear.value === "" || item.tahun === parseInt(selectedYear.value);
    const query = searchQuery.value.toLowerCase();

    // Mapping field sesuai dropdown
    const filterMap = {
      judul: item.judul,
      biodata: item.biodata,
      latar: item.latar,
    };

    if (selectedFilter.value) {
      const field = filterMap[selectedFilter.value] || "";
      return matchYear && String(field).toLowerCase().includes(query);
    }

    // Semua kolom
    const matchSearch = searchQuery.value === "" ||
      Object.values(item).some((val) => String(val).toLowerCase().includes(query));

    return matchYear && matchSearch;
  });
});

// --- Pagination ---
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredData.value.slice(start, start + itemsPerPage.value);
});

// --- Open Detail ---
function openDetail(item) {
  selected.value = item;
  showModal.value = true;
}
</script>

<style>
:root {
  font-family: "Poppins", sans-serif;
}
</style>
