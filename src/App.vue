<template>
  <button
    v-if="!isUsersTableVisible"
    @click="showUsersTable"
  >
    Показать пользователей
  </button>
  <div v-if="isErrorCatched" class="error">
    Ошибка загрузки :(
  </div>
  <Table
    v-if="isUsersTableVisible"
    :content="usersModified"
    :tableHeaderContent="usersTableHeaders"
    @clickOnLine="handleLineClick"
  />
  <ModalCompo
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
      isErrorCatched: false,
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
  mounted() {},
  computed: {
    usersModified() {
      if (this.users && this.users.length) {
        return this.users.map((user) => ([
          user.name,
          user.company,
          user.email,
          user.add.state
        ]));
      }
      return [];
    }
  },
  methods: {
    openTable() {
      this.isUsersTableVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getUserName(fullName) {
      return fullName.split(' ')[1];
    },
    async getUsers() {
      await fetch('https://app.dev-wazzup24.com/api/v1/wazzup_test/')
        .then((result) => result.json() )
        .then((data) => { this.users = data })
        .then(() => { this.openTable() })
        .catch(() => this.isErrorCatched = true );
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
  transition: all .2s ease-in-out;

  &:hover {
    background-color: rgba(204, 131, 20, .5);
  }

  @media (max-width: 1000px) {
    font-size: 12px;
  }
}

.error {
  text-align: center;
  font: 16px/24px 'Arial';
}
</style>
