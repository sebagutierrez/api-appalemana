module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Nicolas',
          fb_uid: 'BVolO2VJ2lWpnj0UU8qlUKhi1HA3',
          lastname_f: 'Avila',
          lastname_m: 'Araya',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', [{ id: 1 }]);
  },
};
