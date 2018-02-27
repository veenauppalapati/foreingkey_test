module.exports = function(sequelize, DataTypes) {
    // Creates table in network database called User
      var User = sequelize.define("User", {
        //LIST OF COLUMNS //
  
        // First name cannot be null, length of characters needa a minimum of 1 and a max of 160
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 160]
          }
        },
        // Last name cannot be null, length of characters (min 1, max 160)
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 160]
          }
        },
        //Email , cannot be null, validates for length of characters and makes sure it is an email format
        email: { 
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1,100],
            isEmail: true
          }
        },
        //Password, cannot be null, validates for length
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1,20]
          }
        },
        
        //Gender, can be null and is a string type of input
        gender: {
            type: DataTypes.STRING,
        }
        
      });

      User.associate = function (models) {
        //1 to hasmany with profession
        User.hasMany(models.Profession, {
        
          onDelete: 'CASCADE', 
          foreignKey: { name:'owner', allowNull: false }
        });
      };
      return User;

    };