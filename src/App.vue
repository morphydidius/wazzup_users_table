<template>
  <button
    v-if="!isUsersTableVisible"
    @click="showUsersTable"
  >
    Показать пользователей
  </button>
  <Table
    v-if="isUsersTableVisible"
    :content="usersModified"
    :tableHeaderContent="usersTableHeaders"
    @clickOnLine="handleLineClick"
  />
  <Modal
    v-if="isModalVisible"
    :content="modalContent"
    @close="closeModal"
  />
</template>

<script>
import Table from './components/table.vue';

export default {
  name: 'App',
  data() {
    return {
      isModalVisible: false,
      isUsersTableVisible: false,
      modalContent: {},
      users: [],
      usersTableHeaders: [
        'Фамилия и имя',
        'Компания',
        'E-mail',
        'Штат'
      ]
    }
  },
  components: {
    Table
  },
  mounted() {
    // this.getUsers();
  },
  computed: {
    usersModified() {
      return this.users.map((user) => ([
        user.name,
        user.company,
        user.email,
        user.add.state
      ]));
    }
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    getUserName(fullName) {
      return fullName.split(' ')[1];
    },
    async getUsers() {
      this.users = await fetch('https://app.dev-wazzup24.com/api/v1/wazzup_test/').then((result) => result.json());
    },
    handleLineClick(line) {
      this.setModalContent(line);
      this.showModal();
    },
    setModalContent(line) {
      this.modalContent = {
        name: this.getUserName(line[0]),
        email: line[2]
      };
    },
    showModal() {
      this.isModalVisible = true;
    },
    showUsersTable() {
      this.getUsers();
      this.isUsersTableVisible = true;
    }    
  }
}
</script>

<style lang="scss" scoped>
button {
  margin: 20px auto;
  display: block;
  background-color: #fff;
  font: 16px/24px 'Arial';
}
</style>
