var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
	lineNumbers: true,
});

var argumentsCount = 0;

document.getElementById("compile").addEventListener("click", function () {
	editor.save();
	var xhttp = new XMLHttpRequest();

	// ajax 요청이 돌아오면 트리거 됨
	xhttp.onreadystatechange = function () {
		// 정상 응답 시
		if (this.readyState == 4 && this.status == 200) {
			if (JSON.parse(xhttp.responseText).errors != undefined) {
				// 에러가 있을 경우 해당 메세지를 출력
				document.getElementById("errors").innerHTML = JSON.parse(xhttp.responseText).errors + "<br><br>";
			} else {
				// 에러가 없을 경우 에러 메세지 초기화
				document.getElementById("errors").innerHTML = "";
			}

			// 서버에서 보낸 contract 코드를 저장
			var contracts = JSON.parse(xhttp.responseText).contracts;

			console.log('contracts', contracts);
			for (var contractName in contracts) {
				var abi = JSON.parse(contracts[contractName].interface);

				document.getElementById("arguments").innerHTML = "";
				// 순회 하며 인자 값을 찾아냄
				for (var count1 = 0; count1 < abi.length; count1++) {
					// 생성자일 경우에 인자 입력용 엘리먼트를 만들어 반환
					if (abi[count1].type == "constructor") {
						argumentsCount = abi[count1].inputs.length;

						document.getElementById("arguments").innerHTML = '<label>Arguments</label>';

						for (var count2 = 0; count2 < abi[count1].inputs.length; count2++) {
							var inputElement = document.createElement("input");
							inputElement.setAttribute("type", "text");
							inputElement.setAttribute("class", "form-control");
							inputElement.setAttribute("placeholder", abi[count1].inputs[count2].type);
							inputElement.setAttribute("id", "arguments-" + (count2 + 1));

							var br = document.createElement("br");

							document.getElementById("arguments").appendChild(br);
							document.getElementById("arguments").appendChild(inputElement);
						}

						break;
					}
				}

				break;
			}
		}
	};

	xhttp.open("GET", "/compile?code=" + encodeURIComponent(document.getElementById("editor").value), true);
	xhttp.send();
})

document.getElementById("deploy").addEventListener("click", function () {
	editor.save();

	var arguments = [];

	// 입력된 인자를 받아서 저장함
	for (var count = 1; count <= argumentsCount; count++) {
		arguments[count - 1] = JSON.parse(document.getElementById("arguments-" + count).value);
	}

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(xhttp.responseText);
			console.log('res', res);

			if (res.error) {
				alert("Error: " + res.error)
			} else {
				alert("Txn Hash: " + res.result.hash);
			}
		} else if (this.readyState == 4) {
			alert("An error occured.");
		}
	};

	xhttp.open("GET", "/deploy?code=" + encodeURIComponent(document.getElementById("editor").value) + "&arguments=" + encodeURIComponent(JSON.stringify(arguments)) + "&address=" + document.getElementById("address").value + "&key=" + document.getElementById("key").value, true);
	xhttp.send();
})