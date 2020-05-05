
        let apiHost = "https://covid19.cdacchn.in:8080/api/listviolators";

        let cred = { current_state_id: 36, current_user_id: 3222, current_user_name: 8888888885  };

        function listViolatorsAddToTable(arr) {

            $("#list-violators").empty();

            var table = $("#list-violators");

            row = $('<tr />');

                table.append(row);

                cell = $('<td>Head 1</td><td>Head 2</td><td>Head 3</td>')

                row.append(cell);

            arr.forEach(function (item, index) {

                row = $('<tr />');

                table.append(row);

                cell = $('<td>' + item[0] + '</td><td>' + item[1] + '</td><td>' + item[2] + '</td>')

                row.append(cell);
            });

        }

        $('#ak-form').submit(function (e) {

            e.preventDefault();

            let params = {
                current_state_id: document.getElementById("current_state_id").value, 
                current_user_id: document.getElementById("current_user_id").value, 
                current_user_name: document.getElementById("current_user_name").value,

                from_date: document.getElementById("from_date").value, 
                to_date: document.getElementById("to_date").value, 
                choice: document.getElementById("choice").value
            }

            console.log(params);

            getDataFromAPI(params);
        });


        function downloadViolators() {

            var doc = new jsPDF();
           
            doc.text('Violators', 14, 20)

            doc.autoTable({ startY:25,  html: '#list-violators' });

            doc.save('download.pdf');
        }

        function getDataFromAPI(params) {

            console.log(apiHost.concat("?", $.param(params)));

            $("#fired-api").text(apiHost.concat("?", $.param(params)))

            $.get(apiHost, params, function (res) {

                console.log(res);

                listViolatorsAddToTable(res.data);
            });
        }

        $(function () {

            getDataFromAPI({
                current_state_id: document.getElementById("current_state_id").value, 
                current_user_id: document.getElementById("current_user_id").value, 
                current_user_name: document.getElementById("current_user_name").value,
            });

        })