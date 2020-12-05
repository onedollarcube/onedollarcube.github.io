	/*  yellow - 1 - 16
		red - 17 - 32
		white - 33 - 48
		orange - 49 - 64
		green - 65 - 80
		blue - 81 - 96
	*/
	var quiz_start = false;
	var is_timer_start = false;
	var pb = Infinity;
	var pb_cn = Infinity;
	var answer_num = 0;
	var answer_goal = 10;

	var path = "images/";
	var cubeskills_url = "https://www.cubeskills.com/images/tools/pll-recognition-trainer/";
	var pll_name = ["Aa", "Ab", "E", "F", "Ga", "Gb", "Gc",
					"Gd", "H", "Ja", "Jb", "Na", "Nb", "Ra",
					"Rb", "T", "Ua", "Ub", "V", "Y", "Z"];


	var r_cn = document.getElementById("toggle");
	var is_cn; //It is Color Neutral?
	var pll_num;
	var pll_name_num;
	var pll_path;
	var pll_img = document.getElementById('pll_image');
	var right_answer;

	var win_count = 0;
	var lose_count = 0;
	var p_win = document.getElementById("p_win");
	var p_lose = document.getElementById("p_lose");

	var cb_yellow = document.getElementById("cb_yellow");
	var cb_white = document.getElementById("cb_white");
	var cb_red = document.getElementById("cb_red");
	var cb_orange = document.getElementById("cb_orange");
	var cb_green = document.getElementById("cb_green");
	var cb_blue = document.getElementById("cb_blue");

	var cb_special1 = document.getElementById("cb_special1");

	var cb = document.getElementsByClassName("cb");

	var wrong_cases = [''];
	var wrong_cases_counter = 0;

	function init(){
		if (!r_cn.checked) {
				document.getElementById("colors").style.display = "none";
		}
		if  (r_cn.checked) {
				document.getElementById("colors").style.display = "block";
		}
		document.getElementById("answers").innerHTML = answer_num + "/" + answer_goal;
	}
	function timerStart(){
		if (is_timer_start) {return;}
		document.getElementById("wrong_cases").innerHTML = ""; //Очистка поля с неправильными кейсами
		genPll();
		sec = 0;
		timer = setInterval(tick, 10); //Старт таймера
		quiz_start = true;
		answer_num = 0;
		console.log("Quiz start");
		is_timer_start = true;
		document.getElementById("radio_whitecolor").disabled = true;
		document.getElementById("toggle").disabled = true;
		document.getElementById("cb_special1").disabled = true;
		document.getElementById("cb_yellow").disabled = true;
		document.getElementById("cb_white").disabled = true;
		document.getElementById("cb_red").disabled = true;
		document.getElementById("cb_orange").disabled = true;
		document.getElementById("cb_green").disabled = true;
		document.getElementById("cb_blue").disabled = true;
	}
	function timerStop(){
		clearInterval(timer);
		pll_img.src = "visualcube.svg";
		quiz_start = false;
		is_timer_start = false;
		if (lose_count == 0) {
			if (r_cn.checked) {
				if (sec < pb_cn) pb_cn = sec;
				document.getElementById("pb_cn").innerHTML = "PB(CN): " + pb_cn/100;
			} else {
				if (sec < pb) pb = sec;
				document.getElementById("pb").innerHTML = "PB: " + pb/100;
			}
		}
		console.log("Quiz stop");
		if (wrong_cases_counter > 0) displayWrongCases();
		wrong_cases_counter = 0;
		win_count = 0;
		lose_count = 0;
		document.getElementById("radio_whitecolor").disabled = false;
		document.getElementById("toggle").disabled = false;
		document.getElementById("cb_special1").disabled = false;
		document.getElementById("cb_yellow").disabled = false;
		document.getElementById("cb_white").disabled = false;
		document.getElementById("cb_red").disabled = false;
		document.getElementById("cb_orange").disabled = false;
		document.getElementById("cb_green").disabled = false;
		document.getElementById("cb_blue").disabled = false;

		console.log("Clearing wrong cases array")
		for (i = wrong_cases.length; i > 1; i--)
		wrong_cases.pop() ;
	}

	function tick(){
		document.getElementById("answers").innerHTML = answer_num + "/" + answer_goal;
	  sec++;
	  document.getElementById("timer").innerHTML = "Timer: " + sec/100;
		if (answer_num == answer_goal) timerStop();
	  }

	function genColor(){
		var n = 0;
		var colors = [0,0,0,0,0,0];
		if (cb_yellow.checked) {
			colors[n] = 1;
			n++;
		}
		if (cb_white.checked) {
			colors[n] = 33;
			n++;
		}
		if (cb_red.checked) {
			colors[n] = 17;
			n++;
		}
		if (cb_orange.checked) {
			colors[n] = 49;
			n++;
		}
		if (cb_green.checked) {
			colors[n] = 65;
			n++;
		}
		if (cb_blue.checked) {
			colors[n] = 81;
			n++;
		}
		var pll_color = colors[Math.floor(Math.random()*n)];

		console.log("genColor " + pll_color);
		return pll_color;
	}

	function genCase() {
		var pll_case = Math.floor(Math.random()*15);
		return genColor() + pll_case;

	}

	function genPll(){
		if(r_cn.checked) {
			is_cn = true;
		}else{
			is_cn = false;
		}

		if(is_cn){
			pll_num = genCase();
		}else{
			pll_num = Math.floor(Math.random()*16) + 1;
		}

		pll_name_num = Math.floor(Math.random()*20);
		right_answer = pll_name[pll_name_num];
		right_answer_full = pll_name[pll_name_num] + pll_num + ".png";
		pll_img.src = path +  right_answer + pll_num + ".png";

		console.log(right_answer + pll_num);
	}

	function genPllSpecial1(){
	//E all; F 1,4,5,8,9,12,13,16; Ga 4,8,12,16; Gc 1,5,9,13; Ra 4,8,12,16; Rb 4,8,12,16; V 4,8,12,16; Y 3,7,11,15;
		var plls = ["E", "F", "Ga", "Gc", "Ra", "Rb", "V", "Y"]; // 0 - 7
		var F_case = [1,4,5,8,9,12,13,16]; // 0 - 7
		var Ga_case = [4,8,12,16]; // 0 - 3
		var Gc_case = [1,5,9,13]; // 0 - 3
		var R_case = [4,8,12,16]; // 0 - 3
		var V_case = [4,8,12,16]; // 0 - 3
		var Y_case = [3,7,11,15]; // 0 - 3

		var pll_special1_case;
		var pll_special1_num = Math.floor(Math.random()*7);
		switch(pll_special1_num){
			case 0: pll_special1_case = Math.floor(Math.random()*15) + 1; // E
			break;
			case 1: pll_special1_case = F_case[Math.floor(Math.random()*7)]; // F
			break;
			case 2: pll_special1_case = Ga_case[Math.floor(Math.random()*3)]; // Ga
			break;
			case 3: pll_special1_case = Gc_case[Math.floor(Math.random()*3)]; // Gc
			break;
			case 4: pll_special1_case = R_case[Math.floor(Math.random()*3)]; // Ra
			break;
			case 5: pll_special1_case = R_case[Math.floor(Math.random()*3)]; // Rb
			break;
			case 6: pll_special1_case = V_case[Math.floor(Math.random()*3)]; // V
			break;
			case 7: pll_special1_case = Y_case[Math.floor(Math.random()*3)]; // Y
			break;
		}

		if(r_cn.checked) {
			is_cn = true;
		}else{
			is_cn = false;
		}

		if(is_cn){
			pll_special1_case += genColor() - 1;
		}

		right_answer = plls[pll_special1_num];
		right_answer_full = plls[pll_special1_num] + pll_special1_case + ".png";
		pll_img.src = path +  right_answer + pll_special1_case + ".png";

		console.log(right_answer + pll_special1_case);

	}

	function train(answer) {
		if (!quiz_start) {return;}
		if (answer == right_answer[0]) {
			win_count++;
			answer_num++;
			document.getElementById("message").innerHTML = ("");
		} else {
			lose_count++;
			answer_num++;
			wrong_cases_counter++;
			wrong_cases.push(right_answer_full) ;
			document.getElementById("message").innerHTML = ("It's " + right_answer);
		}
		p_win.innerHTML = win_count;
		p_lose.innerHTML = lose_count;

		if (cb_special1.checked) {
			genPllSpecial1();
		} else {
			genPll();
		}

	}

	function displayWrongCases(){
		console.log("display wrong cases");
		document.getElementById("message").innerHTML = ("");
		for (i = 1; i <= wrong_cases_counter; i++){
			document.getElementById("wrong_cases").innerHTML += "<img src='" + path + wrong_cases[i] + "'>";
			document.getElementById("wrong_cases").innerHTML +=  "<div>" + (wrong_cases[i])[0] + "</div>" + "<hr>" + "<br>";
		}
	}
