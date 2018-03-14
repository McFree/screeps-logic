var HOSTILES = null;
const CREEP_MOVE_ATACK       = {visualizePathStyle: {stroke: '#ee6a50'}};
const CREEP_MOVE_LINE        = {visualizePathStyle: {stroke: '#ffffff'}};

module.exports = {
  processing: function(room, hostles, solders, rangeds) {
    HOSTILES = hostles;
    let roomName = room.name;
    if(HOSTILES[0]) {
      var username = HOSTILES[0].owner;
      Game.notify(`User ${username} spotted in room ${roomName}`);
      solders.forEach(creep => this.solderDefend(creep, false));
      rangeds.forEach(creep => this.solderDefend(creep, true));
    }
  },

  solderDefend: function(creep, isRanged) {
    if(creep.room.name == creep.memory.target) {
      target = creep.pos.findClosestByPath(HOSTILES[0]);
      if(target) {
        if(isRanged) {
          if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE){
            creep.moveTo(target, CREEP_MOVE_ATACK);
          }
        } else {
          if(creep.attack(target) == ERR_NOT_IN_RANGE){
            creep.moveTo(target, CREEP_MOVE_ATACK);
          }
        }
      }
    } else {
        var route = Game.map.findRoute(creep.room, creep.memory.target);
        if(route.length > 0) {
          creep.moveTo(creep.pos.findClosestByRange(route[0].exit), CREEP_MOVE_LINE);
        }
    }
  }
}