/*
 * 司令 1
 * 团长 2
 * 排长 3
 * 地雷 4
 * 导弹 4
 * 炮兵 6 H 2 M 2 L 2
 * 工兵 6 H 2 M 2 L 2
 * 军旗 1
 * =27 * 2 = 6 * 9
 */

var roleNum = 54;
// 存放未被点击的Role
var roletemp = new Array(roleNum);
// 位置与角色的对应关系
var roleSite = new Array(roleNum);
/*
 * 回合数，判断谁的回合
 * %2 == 1  B
 */
var gameRound = 1;
// 游戏回合
var gameRoundCamp = "B";
// 显示
var gameRule;
var gameConsoleText;
var gameScore;
var startButton;
// 攻击成功与否
var attackSuc = false;

// console 显示区分 前缀
var displayTag = "== "

// 开始标志
var start = false;

// 空白位置的背景色
var NullBackgroudColor = "coral";
// 空白位置字体颜色
var NullColor = "forestgreen";
// 黑色方 字体颜色
var BlackColor = "Black";
// 黑色方 背景颜色
var BlackBackgroundColor = "darkseagreen";
// 白色方 字体
var WhiteColor = "red";
// 白色方 背景颜色 
var WhiteBackgroundColor = "aliceblue";

// 初始化
window.onload = function() {
//  test();

    gameRuleInit();
    gameConsoleInit();

    window.addEventListener("resize", function() {
        var gameArea = document.getElementsByClassName("gamearea");
        //      var gameDiv = document.getElementsByClassName("gamediv");
        gameArea.width = window.innerWidth;
        gameArea.height = window.innerHeight;
        //      console.log(window.innerWidth+" * "+window.innerHeight);
        //      gameDiv.height = window.innerHeight/2;
        //      console.log(window.innerWidth+" * "+window.innerHeight+" "+gameDiv.height)
    }, false);
}

function test() {

    var i, max = 99,
        ran;
    var arr = new Array(max);
    var arrT = new Array(max);
    for(var x = 0; x < max; x++) {
        arr[x] = x;
    }
    var NMax = 2000;
    var arrN = new Array(NMax);

    for(var j = 0; j < NMax; j++) {
        arrN[j] = new Array(max);
        arrT = arr.slice();
        //      for( i = 0; i<max;i++){
        //          ran = Math.floor(Math.random()*arrT.length );
        //          arrN[j][i] = arrT[ran];
        //          arrT.splice(ran,1);
        //      }
        var temp = 0;
        for(i = 0; i < max; i++) {
            ran = Math.floor(Math.random() * arrT.length);
            temp = arrT[i];
            arrT[i] = arrT[ran];
            arrT[ran] = temp;
        }
        arrN[j] = arrT.slice();
    }

    var ntest = new Array(max);
    // test
    for(var j = 0; j < max; j++) {
        var num = 0;
        for(var i = 0; i < NMax; i++) {
            num += arrN[i][j];
        }
        ntest[j] = num / NMax;
    }

    // print
    for(var i = 0; i < max; i++) {
        console.log(ntest[i])
    }
}

function gameAreaInit() {
    //      var roleJson = {"role":"SL","camp":"W","level":"1"}
    var role = new Array(
        // W,B 表示camp 阵营
        // DL，JQ。。 表示Role 角色
        // 0，1，2，3 表示等级
        // A,B,C... 只是标志
        //      "WSL0B",
        //      "BSL0B",
        "WTZ0B",
         "BDD0D",
        "WGB2C", 
         "BPB1A", 
        "WDL0B", 
         "BPZ0A", 
        "WDL0D",
         "BPB3F",
         "BGB1A", 
        "WPB1B", 
        "WSL0A",
         "BDD0C", 
        "WPB2C", 
         "BTZ0B",
        "WDD0A", 
         "BJQ0A",
        "WPB1A", 
         "BDL0C", 
        "WGB2D", 
         "BDL0B", 
        "WPB3F",
         "BGB3E", 
        "WPZ0A", 
         "BPB2C", 
        "WGB3F",
         "BDD0A", 
        "WJQ0A",
         "BTZ0A", 
        "WPZ0C",
         "BSL0A",
        "WDL0C",
         "BGB1B", 
         "BPZ0C",
        "WDD0B", 
         "BGB2C", 
        "WPB3E", 
         "BGB2D", 
        "WDL0A", 
         "BPB2D", 
        "WDD0D",
         "BGB3F",
        "WTZ0A", 
        "WGB3E", 
         "BDL0D",
        "WGB1A", 
         "BDD0B", 
        "WPB2D", 
         "BPB1B", 
         "BPZ0B", 
        "WDD0C", 
         "BPB3E", 
        "WPZ0B", 
         "BDL0A",
        "WGB1B"
    );
    roletemp = role.slice();

    var roleInit = new Array(roleNum);
    var i, ran;
    //      随机排序  Fisher–Yates shuffle
    for(i = 0; i < roleNum; i++) {
        ran = Math.floor(Math.random() * role.length);
        console.log(ran + " " + role.length);
        roleInit[i] = role[ran];
        role.splice(ran, 1);
    }

    //      排序完成,开始分配Role
    ////      定义对应的二维数组
    //      var roleArray = new Array(6);
    //      for(var i = 0; i<6;i++){
    //          roleArray[i] = new Array(6);
    //      }
    var roleIndex = 0;
    for(var i = 0; i < 6; i++) {
        for(var j = 0; j < 9; j++) {
            roleSite["R" + i + "C" + j] = roleInit[roleIndex];
            roleIndex++;
        }
    }
    //      test
    for(var i in roleSite) {
        console.log(i + ":" + roleSite[i])
    }

}
/*
 * 显示游戏规则
 */
function gameRuleInit() {
    gameRule = document.getElementsByClassName("gameRule");

    var gameRuleText = document.getElementById("gameRuleText");
    gameRuleText.innerHTML = 
        "<li><span>司令 x 1</span>：可攻击<span>团长</span>，<span>排长</span>，<span>炮兵</span>，<span>工兵</span>。</li>" +
        "<li><span>团长 x 2</span>：可攻击<span>排长</span>，<span>炮兵</span>，<span>工兵</span>。</li>" +
        "<li><span>排长 x 3</span>：可攻击<span>炮兵</span>，<span>工兵</span>。</li>" +
        "<li><span>炮兵 x 6</span>：可攻击<span>司令</span>，<span>团长</span>，<span>排长</span>，<span>工兵</span>。" +
        "但必须中间隔一个角色，类似与象棋中的 <span>炮</span>。分为<span>高级炮兵 x 2</span>，<span>中级炮兵 x 2</span>，<span>低级炮兵 x 2。</span></li>" +
        "<li><span>工兵 x 6</span>：可拆除<span>地雷</span>，<span>导弹</span>。可抗走敌方<span>军旗</span>从而取得胜利。" +
        "分为<span>高级工兵 x 2</span>，<span>中级工兵 x 2</span>，<span>低级工兵 x 2。</li>" +
        "<li><span>导弹 x 4</span>：可远距离攻击同行或列上的<span>司令</span>，<span>团长</span>，<span>排长</span>，<span>炮兵</span>。不可移动。</li>" +
        "<li><span>地雷 x 4</span>：如果<span>地雷</span>的周围没有<span>工兵</span>，则可以爆炸，从而照成周围8格已翻开的角色的死亡。不可移动。</li>" +
        "<li><span>军旗 x 1</span>：<span>己方工兵</span>抗走<span>敌方军旗</span>则游戏胜利。</li>" +
        "<li><span>同等级可同归于尽</span></li>" +
        "<style>span{font-style:italic;color:crimson}</style>" +
        "<p>点击下方 <span>开始</span> 开始游戏 </p>" +
        "<style>p{font-size: 20px;font-weight: bold} </style>"
}
/*
 * 显示游戏play中的动态
 */
function gameConsoleInit() {

    gameConsoleText = document.getElementById("gameConsoleText")
    startButton = document.getElementById("gameStartButton");

}

function displayMsg(content) {
    //  if(content.slice(0,1) == "第"){
    //      console.log("yes");
    //  }
    gameConsoleText.innerHTML += "<br /> " + content + "<br/>";
    // 控制滚动条保持在最底部
    gameConsoleText.scrollTop = gameConsoleText.scrollHeight;
}
/*
 * 显示比分，回合等
 */
function gameScoreInit() {
    gameScore = document.getElementsByClassName("gameScore");

}

function showRole(id) {

    // 判断是否start
    if(start) {

    } else {
        displayMsg("请点击<span> 开始 </span>开始游戏！")
        return;
    }

    //  console.log(id)
    var idIndex = roletemp.indexOf(roleSite[id]);
    //  console.log(idIndex)
    //  console.log(roleSite[id])
    //  console.log(roletemp[idIndex])

    // 展现角色
    if(idIndex >= 0) {
        var d = document.getElementById(id);
        // 添加动态效果
        d.setAttribute("class", "clickAnimation");
        //      d.style.background = "url(img/"+ roleSite[id].slice(1,3)+".png)";
        d.innerHTML = roleTrans(roleSite[id].slice(1, 4));
        // 改变白色方字体颜色
        if(roleSite[id].slice(0, 1) == "W") {
            d.style.color = WhiteColor;
            //          d.style.border = "white"; 
            d.style.backgroundColor = WhiteBackgroundColor;
        } else {
            d.style.color = BlackColor;
            //          d.style.border = "black";
            d.style.backgroundColor = BlackBackgroundColor;
        }
        console.log(roleSite[id].slice(1, 3));
        displayMsg(displayTag + roleTransList[gameRoundCamp] + " 翻开 " + roleTransList[roleSite[id].slice(0, 1)] + " 的 " + roleTransList[roleSite[id].slice(1, 4)]);
        //      从idIndex的位置开始删除一个元素
        roletemp.splice(idIndex, 1);
        console.log("翻开:" + id + " role:" + roleSite[id]);
        // 元素选定判断标志初始化
        one = true;

        // 回合判定
        roundJudg();
    } else {
        console.log("选择该元素");
        displayMsg(displayTag + roleTransList[gameRoundCamp] + " 选择 " + roleTransList[roleSite[id].slice(0, 1)] + " 的 " + roleTransList[roleSite[id].slice(1, 4)]);

        //      元素选定判断
        if(one) {
            // 第一次不能选择空位置或敌方camp
            if(roleSite[id].slice(0, 1) == gameRoundCamp) {
                attackObj["oneRole"] = new Array(roleSite[id], id);
                console.log(attackObj["oneRole"])
                one = false;

            } else {
                console.log("点击无效，请选择" + roleTransList[gameRoundCamp] + " 阵营！");
                displayMsg("<span>" + displayTag + "选择无效，请选择 " + roleTransList[gameRoundCamp] + " 阵营！</span>");
            }
        } else {

            if(roleSite[id] == "DLT0A") {
                // 移动判断
                console.log("移动");
                console.log(attackObj["twoRole"])
                var r1Tmp = attackObj["oneRole"][0].slice(1, 3);
                var r1IdTmp = attackObj["oneRole"][1];
                if(r1Tmp == "DD" || r1Tmp == "DL" || r1Tmp == "JQ") {
                    // DD 和 DL,JQ 不能移动
                    console.log("DD 和 DL,JQ 不能移动")
                    displayMsg(displayTag + "导弹 、 地雷 和 军旗  不能移动");
                } else {
                    move(r1IdTmp, id, "MOVE");
                    roundJudg();
                }
                one = true;

            } else {
                // 攻击
                attackObj["twoRole"] = new Array(roleSite[id], id);
                console.log(attackObj["twoRole"])
                one = true;
                attackSuc = false;
                attackJudgment();
                //攻击不成功，回合不结束
                //              if(!attackSuc){
                //                  gameRound --;
                //              }
            }
        }
    }

    //      test
    //  console.log(roletemp)
}

var roleReltship = new Array();
roleReltship["SL"] = new Array("TZ", "PZ", "PB", "GB");
roleReltship["TZ"] = new Array("PZ", "PB", "GB");
roleReltship["PZ"] = new Array("PB", "GB");
roleReltship["PB"] = new Array("SL", "TZ", "PZ", "GB");
roleReltship["GB"] = new Array("JQ", "DL", "DD");
roleReltship["DD"] = new Array("SL", "TZ", "PZ", "PB", "DL");
roleReltship["DL"] = new Array("SL", "TZ", "PZ", "PB", "DD");
roleReltship["JQ"] = new Array();

var attack = new Object();
var attackObj = {
    "oneRole": new Array(),
    "twoRole": new Array()
};
// 元素选定判断标志
var one = true;
//  攻击判定
function attackJudgment() {
    console.log(attackObj["oneRole"] + "  " + attackObj["twoRole"]);
    var r1 = attackObj["oneRole"][0],
        r2 = attackObj["twoRole"][0];
    var r1Id = attackObj["oneRole"][1],
        r2Id = attackObj["twoRole"][1];
    var r1R = parseInt(r1Id.slice(1, 2)),
        r1C = parseInt(r1Id.slice(3));
    var r2R = parseInt(r2Id.slice(1, 2)),
        r2C = parseInt(r2Id.slice(3));
    //  console.log(r1R+"  "+ r1C);
    var r1Camp = r1.slice(0, 1),
        r2Camp = r2.slice(0, 1);
    var r1Role = r1.slice(1, 3),
        r2Role = r2.slice(1, 3);
    var r1RoleandLevel = r1.slice(1, 4),
        r2RoleandLevel = r2.slice(1, 4);
    var r1Level = r1.slice(3, 4),
        r2Level = r2.slice(3, 4);

    //判断是否是是同一张牌
    if(r1 == r2) {
        console.log("同一张牌");
    } else {
        console.log("不同牌");
        //  判断两张牌所属阵营
        if(r1Camp == r2Camp) {
            console.log("同一阵营，不能攻击");
            displayMsg("<span>" + displayTag + "同一阵营，不能攻击!" + "</span>");
        } else {
            console.log("不同阵营");
            // 兵种判断
            if(r1Role == r2Role) {
                //  判断同兵种攻击
                console.log("相同兵种");
                if(r1Level > r2Level) {
                    // 攻击成功
                    console.log("可以攻击，开始判断位置");
                    // 位置判断
                    if(attackSiteJudg()) {
                        // 可以攻击
                        attackSuccess("");
                    } else {
                        // 不可以攻击
                    }
                    //                      attackSiteJudg();
                } else if(r1Level == r2Level) {
                    // 同归于尽
                    console.log("同归于尽？开始判断位置");
                    //                      displayMsg(displayTag+"同等级不能攻击！");
                    // 位置判断
                    if(attackSiteJudg()) {
                        // 可以攻击
                        attackSuccess("blox");
                    } else {
                        // 不可以攻击
                    }
                } else {
                    // 以卵击石？!
                    console.log("以卵击石？!开始判断位置");
                    displayMsg(displayTag + "不可越级攻击！");
                    // 位置判断
                    //                      attackSiteJudg();
                }
            } else {
                //      判断不同兵种攻击
                console.log("不同兵种");
                console.log(r1Role + " " + r2Role);
                if(roleReltship[r1Role].indexOf(r2Role) > -1) {
                    // 如果能够被攻击
                    console.log("能够发起攻击,开始判断位置")
                    // 位置判断
                    if(attackSiteJudg()) {
                        // 可以攻击
                        attackSuccess("");
                    } else {
                        // 不可以攻击
                    }
                } else {
                    // 不能被攻击
                    console.log("不能被攻击")
                    displayMsg(displayTag + "不能发起攻击！");
                }
            }

        }
    }
    // 数据初始化
    attackObj["oneRole"] = null;
    attackObj["twoRole"] = null;
    // 攻击位置检测
    function attackSiteJudg() {
        // 判断攻击位置是否合理
        if(r1Role == "JQ") {
            // JQ 不可移动
            console.log("JQ不可移动");
            displayMsg("JQ不可移动");
            return false;
        } else if(r1Role == "PB" || r1Role == "DD") {
            // 必须有一个方向相同
            if(r1R == r2R) {
                // 在一条横线上
                console.log("在一条横线上");
                // 查询 2个中间间隔的Role个数
                var min, max;
                if(r1C > r2C) {
                    min = r2C;
                    max = r1C;
                } else {
                    min = r1C;
                    max = r2C;
                }
                //          var spacing = math.abs(r2C - r1C);
                var rNum = 0; // 中间的role个数
                for(var i = min + 1; i < max; i++) {
                    console.log("role " + "R" + r1R + "C" + i + roleSite["R" + r1R + "C" + i])
                    if(roleSite["R" + r1R + "C" + i] != "DLT0A") {
                        rNum++;
                    }
                }
                console.log("间隔 " + rNum);
                if(rNum == 1) {
                    if(r1Role == "PB") {
                        // 可以攻击
                        console.log("PB可以攻击");
                        return true;
                    } else if(r1Role == "DD") {
                        // DD不可以攻击
                        console.log("DD不可以攻击")
                        displayMsg(displayTag + roleTransList[r1RoleandLevel] + " 不可以跳跃式攻击！");
                        return false;
                    }
                } else if(rNum == 0) {
                    if(r1Role == "PB") {
                        // 不可以攻击
                        console.log("PB不可以攻击");
                        displayMsg(displayTag + roleTransList[r1RoleandLevel] + " 只能隔一个角色攻击！");
                        return false;
                    } else if(r1Role == "DD") {
                        // DD可以攻击
                        console.log("DD可以攻击")
                        return true;
                    }
                } else {
                    // 不可以攻击
                    console.log("由于间隔过多，不可以攻击");
                    displayMsg(displayTag + "由于间隔过多，不可以攻击");
                    return false;
                }
            } else if(r1C == r2C) {
                // 在一条竖线上
                console.log("在一条竖线上");
                // 查询 2个中间间隔的Role个数
                var min, max;
                if(r1R > r2R) {
                    min = r2R;
                    max = r1R;
                } else {
                    min = r1R;
                    max = r2R;
                }
                //          var spacing = math.abs(r2C - r1C);
                var rNum = 0; // 中间的role个数
                for(var i = min + 1; i < max; i++) {
                    console.log("role " + "R" + r1R + "C" + i + roleSite["R" + i + "C" + r1C])
                    if(roleSite["R" + i + "C" + r1C] != "DLT0A") {
                        rNum++;
                    }
                }
                console.log("间隔 " + rNum);
                if(rNum == 1) {
                    if(r1Role == "PB") {
                        // 可以攻击
                        console.log("PB可以攻击");
                        return true;
                    } else if(r1Role == "DD") {
                        // DD不可以攻击
                        console.log("DD不可以攻击")
                        displayMsg(displayTag + roleTransList[r1RoleandLevel] + " 不可以跳跃式攻击！");
                        return false;
                    }
                } else if(rNum == 0) {
                    if(r1Role == "PB") {
                        // 不可以攻击
                        console.log("PB不可以攻击");
                        displayMsg(displayTag + roleTransList[r1RoleandLevel] + " 只能隔一个角色攻击！");
                        return false;
                    } else if(r1Role == "DD") {
                        // DD可以攻击
                        console.log("DD可以攻击");
                        return true;
                    }
                } else {
                    // 不可以攻击
                    console.log("由于间隔过多，不可以攻击");
                    displayMsg(displayTag + "由于间隔过多，不可以攻击");
                    return false;
                }
            } else {
                console.log("PB不能攻击！");
                displayMsg(displayTag + roleTransList[r1RoleandLevel] + "不可斜向攻击！");
                return false;
            }
        } else if(r1Role == "DL") {
            // 如果四周没有GB 可以attack
            // 四周检查，包括自己
            var gbtag = false;
            //          console.log("r1");

            GBtag:
                for(var r = r1R - 1; r <= r1R + 1; r++) {
                    for(var c = r1C - 1; c <= r1C + 1; c++) {
                        console.log("R" + r + "C" + c + "  ");
                        if(r < 0) {
                            continue;
                        } else if(c < 0) {
                            continue;
                        } else if(r > 5) {
                            continue
                        } else if(c > 8) {
                            continue
                        } else {
                            console.log("R" + r + "C" + c + "\/");
                            // 查看是否翻开了
                            var covered = roletemp.indexOf(roleSite["R" + r + "C" + c]);
                            if(covered >= 0) {
                                // 该牌未翻
                                console.log("R" + r + "C" + c + " 未翻！");
                            } else {
                                // 已翻，判断GB，
                                if(roleSite["R" + r + "C" + c].slice(1, 3) == "GB") {
                                    // 有工兵，直接break
                                    console.log("有GB，无法攻击");
                                    gbtag = true;
                                    break GBtag;
                                } else {
                                    // 可以攻击
                                    console.log("R" + r + "C" + c + " 已翻！");
                                }
                            }
                        }
                    }
                }
            //          console.log("test3");

            if(gbtag) {
                console.log("有GB，无法attack");
                displayMsg(displayTag + "周围有工兵，无法引爆！");
                return false;
            } else {
                console.log("无GB，Attack!");
                displayMsg(displayTag + "周围无工兵，可以引爆！");
                return true;
            }
        } else {
            if(r1R == r2R && Math.abs(r1C - r2C) == 1) {
                console.log("相差一格，可以攻击");
                return true;
            } else if(Math.abs(r1R - r2R) == 1 && r1C == r2C) {
                console.log("相差一格，可以攻击");
                return true;
            } else {
                console.log("距离过远，打不到");
                displayMsg(displayTag + "距离过远，打不到");
                return false;
            }
        }
    }
    /*
     * 攻击处理
     * tag 攻击方式攻击 ，默认""
     */

    function attackSuccess(tag) {
        // 移动自己到目标位置
        if(r1Role == "DD") {
            displayMsg(displayTag + roleTransList[r1Camp] + " " + roleTransList[r1RoleandLevel] + " 成功消灭 " + roleTransList[r2Camp] + " " + roleTransList[r2RoleandLevel]);
            //          move(r1Id,r2Id,"ATTACK");
            //          // 删除自己
            //          var dltr2 = document.getElementById(r2Id);
            //          roleSite[r2Id] = "DLT0A";
            //          dltr2.style.backgroundColor = NullBackgroudColor;
            //          dltr2.style.color = NullColor;
            //          dltr2.innerHTML = "";
            blox(r1Id, r2Id);
        } else if(r1Role == "DL") {
            for(var r = r1R - 1; r <= r1R + 1; r++) {
                for(var c = r1C - 1; c <= r1C + 1; c++) {
                    if(r < 0) {
                        continue;
                    } else if(c < 0) {
                        continue;
                    } else if(r > 5) {
                        continue
                    } else if(c > 8) {
                        continue
                    } else {
                        // 查看是否翻开了
                        var covered = roletemp.indexOf(roleSite["R" + r + "C" + c]);
                        if(covered >= 0) {
                            // 该牌未翻
                            console.log("R" + r + "C" + c + " 未翻！");
                        } else {
                            console.log("R" + r + "C" + c + " 已翻！消灭")
                            // 已翻，删除,保留JQ
                            if(roleSite["R" + r + "C" + c].slice(1, 3) == "JQ") {} else {
                                displayMsg(displayTag + roleTransList[r1Camp] + " 方 " + roleTransList[r1RoleandLevel] + " 成功消灭 " +
                                    roleTransList[roleSite["R" + r + "C" + c].slice(0, 1)] + " 方 " + roleTransList[roleSite["R" + r + "C" + c].slice(1, 4)]);
                                var dDL = document.getElementById("R" + r + "C" + c);
                                roleSite["R" + r + "C" + c] = "DLT0A";
                                //                          dDL.style.background = "url(img/delete.jpg)";
                                dDL.style.color = NullColor;
                                dDL.style.backgroundColor = NullBackgroudColor
                                dDL.innerHTML = "";

                            }
                        }
                    }
                }
            }
        } else if(r1Role == "GB" && r2Role == "JQ") {
            // 胜利 gameover
            //          var wincamp ;
            //          if(r1Camp = "B"){
            //              wincamp = "Black";
            //          }else{
            //              wincamp = "white"
            //          }
            move(r1Id, r2Id, "ATTACK");
            console.log(roleTransList[r1Camp] + " win!<br/>game over");
            displayMsg(roleTransList[r1Camp] + " 获得胜利!<br/>恭喜!!!!!!<br/>游戏结束！");
            gameover(r1Camp);
        } else {
            // 攻击方式的判定
            if(tag == "blox") {
                // 同归于尽
                displayMsg(displayTag + "同归于尽!");
                blox(r1Id, r2Id);
            } else {
                // 虐杀
                displayMsg(roleTransList[r1Camp] + " " + roleTransList[r1RoleandLevel] + " 成功消灭 " + roleTransList[r2Camp] + " " + roleTransList[r2RoleandLevel]);
                move(r1Id, r2Id, "ATTACK");
            }
        }
        // 回合判定
        roundJudg();
    }

}

/*
 * 移动元素到其他位置
 * r1ID  要移动的元素的id
 * r2ID  要移动到的地点的id
 * MorA  移动还是攻击
 */
function move(r1ID, r2ID, MorA) {

    if(MorA == "MOVE") {
        // 移动要求只能走一位
        var r1R = r1ID.slice(1, 2),
            r1C = r1ID.slice(3);
        var r2R = r2ID.slice(1, 2),
            r2C = r2ID.slice(3);
        if(r1R == r2R && Math.abs(r1C - r2C) == 1) {
            console.log("相差一格，可以移动");
            displayMsg(displayTag + roleTransList[roleSite[r1ID].slice(0, 1)] + " 移动了 " + roleTransList[roleSite[r1ID].slice(1, 4)]);
        } else if(Math.abs(r1R - r2R) == 1 && r1C == r2C) {
            console.log("相差一格，可以移动");
            //          displayMsg( "相差一格，可以移动");
        } else {
            console.log("距离过远，不能移动");
            displayMsg(displayTag + "距离过远，不能移动");
            return;
        }
    } else if(MorA == "ATTACK") {
        // 攻击不需要判定
    }

    // 修改目标数据
    var r1d = document.getElementById(r1ID);
    var r2d = document.getElementById(r2ID);

    roleSite[r2ID] = roleSite[r1ID];
    roleSite[r1ID] = "DLT0A";

    //  r2d.style.background = r1d.style.background;
    //  r1d.style.background = "url(img/delete.jpg)";

    r2d.style.backgroundColor = r1d.style.backgroundColor;
    r1d.style.backgroundColor = NullBackgroudColor;

    console.log(r1d.style.color + " " + r2d.style.color);
    r2d.style.color = r1d.style.color;
    r1d.style.color = NullColor;

    // 修改目标display
    r1d.innerHTML = "";
    r2d.innerHTML = roleTrans(roleSite[r2ID].slice(1, 4));

}
/*
 * camp 胜利阵营 B or W
 */
function gameover(camp) {
    alert(roleTransList[camp] + " 获胜，恭喜！！！！！");
    //  alert()
    location.reload();
}

function startGame() {

    start = true;

    gameAreaInit();

    gameScoreInit();
    
    // 提示玩家输入昵称
    var bName = prompt("请输入 黑色方 昵称：","黑色方");
    var wName = prompt("请输入 白色方 昵称：","白色方");
    if(bName != null && bName != ""){
        roleTransList["B"] = bName;
    }
    if(wName != null && wName != ""){
        roleTransList["W"] = wName;
    }
    
    
    console.log("游戏开始" + "\n<p> </p>" + "第 " + gameRound + " 回合, " + roleTransList[gameRoundCamp] + " 开始");
    gameConsoleText.innerHTML = "游戏开始" + "<br />" + "第 " + gameRound + " 回合, " + roleTransList[gameRoundCamp] + " 开始";

    // 变为重置按钮
    startButton.innerHTML = "重置";
    startButton.removeAttribute("onclick");
    startButton.setAttribute("onclick", "resetGame()");

}

function resetGame() {
    location.reload();
}
var roleTransList = new Array();
roleTransList["SL0"] = "司令";
roleTransList["TZ0"] = "团长"
roleTransList["PZ0"] = "排长"

roleTransList["PB3"] = "高级炮兵"
roleTransList["PB2"] = "中级炮兵"
roleTransList["PB1"] = "低级炮兵"
roleTransList["GB3"] = "高级工兵"
roleTransList["GB2"] = "中级工兵"
roleTransList["GB1"] = "低级工兵"
roleTransList["DL0"] = "地雷"
roleTransList["DD0"] = "导弹"
roleTransList["JQ0"] = "军旗"

roleTransList["LT0"] = "空位置"

roleTransList["D"] = "空"
roleTransList["B"] = "黑色方"
roleTransList["W"] = "白色方"

/*
 * Role的转换，Role 到 汉字
 */
function roleTrans(role) {
    return roleTransList[role];
}

/*
 * 同归于尽
 */
function blox(r1ID, r2ID) {
    move(r1ID, r2ID, "ATTACK");
    // 删除自己
    var dltr2 = document.getElementById(r2ID);
    roleSite[r2ID] = "DLT0A";
    dltr2.style.backgroundColor = NullBackgroudColor;
    dltr2.style.color = NullColor;
    dltr2.innerHTML = "";
}
/* 回合判断
 * 
 */
function roundJudg() {
    gameRound++;
    if(gameRound % 2 == 1) {
        // Black 回合
        gameRoundCamp = "B";
    } else {
        // white 回合
        gameRoundCamp = "W";
    }
    console.log("第 " + gameRound + " 回合, " + roleTransList[gameRoundCamp] + " 开始");
    displayMsg("--------<br/>" + "第 " + gameRound + " 回合, " + roleTransList[gameRoundCamp] + " 开始");
}

//function mouseover(id) {
//  var d = document.getElementById(id);
//  d.style.backgroundColor = "#3e8e41";
//}
//
//function mouseout(id) {
//  var d = document.getElementById(id);
//  if(d.style.color == "black" && d.style.backgroundColor == "#3e8e41") {
//      d.style.backgroundColor = "#4CAF50"
//  } else if(d.style.color == "red") {
//      d.style.backgroundColor = "white";
//  } else if(d.style.color == "black") {
//      //  }else if(d.style.color == ""){
//      d.style.backgroundColor = NullBackgroudColor;
//
//  }
//}

function updateLog(){
    
    var log  = 
        "2017-10-18 \n  发起项目，完成初始版本。\n"+
        "2017-10-20 \n  添加游戏规则框、消息记录框和开始、重置按钮。\n"+
        "2017-10-21 \n  优化消息记录的输出。\n"+
        "2017-10-22 \n  1.优化卡牌显示效果。添加点击卡牌旋转动画。\n"+
        "  2.修复回合控制错误。\n"+
        "  3.优化游戏规则，添加同归于尽的攻击。\n"+
        "  4.优化代码逻辑。\n"+
        "  5.添加更新记录按钮。\n"+
        "  6.优化整体布局。\n"+
        "2017-10-25 \n  1.添加玩家输入昵称功能。\n"+
        ""
    
    alert(log);
//var up = document.getElementById("updateLog");
//up.innerHTML = log;
}
