class ShielComponent extends Component {
    name = "ShieldComponent"
    start() {
        this.damage = 25
        this.shieldSize = 10
        this.shieldRadius = 60
        this.angularVelocity = 0.5
        this.angle = 0
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.player = GameObject.getObjectByName("PlayerObject")
        this.centerX = this.player.transform.x
        this.centerY = this.player.transform.y
        this.transform.sx = this.shieldSize
        this.transform.sy = this.shieldSize
        this.upgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:0.1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"FireRate",upgradeValue:0.1,upgradeName:"FireRate++",upgradeDescription:"Increase Fire rate of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"ReloadSpeed",upgradeValue:0.1,upgradeName:"Reload++",upgradeDescrption:"Increase reload speed by 10%"}
        ]
    }

    update() {
        this.velocity = {
            x: 5 * Math.cos(this.angle),
            y: 5 * Math.sin(this.angle)
        }
        this.enemies = this.enemyController.currentEnemies

        this.centerX = this.player.transform.x
        this.centerY = this.player.transform.y
        this.angle += this.angularVelocity
        this.transform.x = this.centerX + this.shieldRadius * Math.cos(this.angle)
        this.transform.y = this.centerY + this.shieldRadius * Math.sin(this.angle)

        this.enemies.forEach(enemy => {
            let enemyType = undefined
            if(enemy.getComponent("BasicEnemyComponent")){
                enemyType = enemy.getComponent("BasicEnemyComponent")
            }
            if(enemy.getComponent("BossEnemyComponent")){
                enemyType = enemy.getComponent("BossEnemyComponent")
            }
            if (Math.abs(enemy.transform.x - this.transform.x) < this.transform.sx / 2 + enemy.transform.sx / 2) {
                if (Math.abs(enemy.transform.y - this.transform.y) < this.transform.sx / 2 + enemy.transform.sy / 2) {
                    this.send(this, enemyType, "ShieldHit")
                }
            }
        })

    }
}

window.ShieldComponent = ShielComponent