const buttons = document.querySelectorAll(".button");
      
      function toggleEmployee(employeeName) {
        const button = document.querySelector(
          `button[data-employee="${employeeName}"]`
        );
        button.classList.toggle("selected");
      }

      /* Toast */
      function showToast(message) {
        const toastElement = document.getElementById("toast");
        const toastMessage = toastElement.querySelector(".toast-message");
        toastMessage.textContent = message;
        toastElement.classList.add("show");

        setTimeout(() => {
          toastElement.classList.remove("show");
          toastMessage.textContent = "";
        }, 3000);
      }

      function closeToast() {
        const toastElement = document.getElementById("toast");
        toastElement.classList.remove("show");
      }

      /* 顯示外勤時間 */
      $(document).ready(function() {
    $('input[name="attendanceStatus"]').change(function() {
        if ($('#attendanceStatusField').is(':checked')) {
            // 如果選擇了"上班外勤"，顯示外勤時間欄位
            $('#fieldSection').show();
        } else {
            // 其他情況，隱藏外勤時間欄位
            $('#fieldSection').hide();
        }
    });
    // 一開始隱藏外勤時間欄位，或者可以根據預設的選項設定
    $('#fieldSection').hide();
});
      

      /* 顯示請假選項 */
      $(document).ready(function() {
    $('input[name="attendanceStatus"]').change(function() {
        if ($('#attendanceStatusLeave').is(':checked')) {
            // 如果選擇了"請假"，顯示請假選項
            $('#leaveSection').show();
        } else {
            // 其他情況，隱藏請假選項
            $('#leaveSection').hide();
        }
    });
    // 一開始隱藏外勤時間欄位，或者可以根據預設的選項設定
    $('#leaveSection').hide();
});

      /* 顯示WFH原因 */
      $(document).ready(function() {
    $('input[name="attendanceStatus"]').change(function() {
        if ($('#attendanceStatusWFH').is(':checked')) {
            // 如果選擇了"WFH"，顯示WFH原因
            $('#WFHSection').show();
        } else {
            // 其他情況，隱藏WFH原因欄位
            $('#WFHSection').hide();
        }
    });
    // 一開始隱藏外勤時間欄位，或者可以根據預設的選項設定
    $('#WFHSection').hide();
});

//時間選單後面的時間不能比前面還早（外勤）
document.getElementById('StartTime').addEventListener('change', function() {
    let endTimeInput = document.getElementById('EndTime');
    if (this.value && endTimeInput.value && this.value > endTimeInput.value) {
        alert('起始時間不能晚於結束時間');
        this.value = ''; // 清除startTime的值或者你可以設定一個合理的預設值
    }
});

document.getElementById('EndTime').addEventListener('change', function() {
    let startTimeInput = document.getElementById('StartTime');
    if (this.value && startTimeInput.value && this.value < startTimeInput.value) {
        alert('結束時間不能早於起始時間');
        this.value = ''; // 清除endTime的值或者你可以設定一個合理的預設值
    }
});
//時間選單後面的時間不能比前面還早（請假）
let attendanceStatus;
document.addEventListener('DOMContentLoaded', function() {

  let checkDates = function() {
        let startTimeValue = new Date(document.getElementById('dateTimePicker1').value);
        let endTimeValue = new Date(document.getElementById('dateTimePicker2').value);
        
        if (startTimeValue && endTimeValue && endTimeValue < startTimeValue) {
            alert('結束時間不能早於起始時間');
            document.getElementById('dateTimePicker2').value = ''; // 清除dateTimePicker2的值
        }
    };
//初始化 flatpickr
    flatpickr("#dateTimePicker1", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        onChange: function(selectedDates, dateStr, instance) {
            checkDates();
        }
    });
    flatpickr("#dateTimePicker2", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        onChange: function(selectedDates, dateStr, instance) {
            checkDates();
        }
    }); 
});

    // 抵擋被隱藏時的時間選單的required
    const isFieldChecked = document.getElementById('attendanceStatusField').checked;
    if(!isFieldChecked) {
        document.getElementById('StartTime').removeAttribute('required');
        document.getElementById('EndTime').removeAttribute('required');
    }
    
    if (attendanceStatus === "上班外勤") {
        開始時間 = document.getElementById("StartTime").value;
        結束時間 = document.getElementById("EndTime").value;
    } else if (attendanceStatus === "請假") {
        開始時間 = document.getElementById("dateTimePicker1").value;
        結束時間 = document.getElementById("dateTimePicker2").value;
        假別 = document.getElementById("workOption").value;
    } else if (attendanceStatus === "WFH") {
        WFH原因 = document.getElementById("WFHreason").value;
    }


    // 將打卡資訊送到後端進行記錄
    document
    .getElementById("attendanceForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const selectedButtons = document.querySelectorAll("button.selected");
      const selectedEmployees = Array.from(selectedButtons).map(
        (button) => button.textContent.trim()
      );
      const attendanceStatus = document.querySelector(
        'input[name="attendanceStatus"]:checked'
      ).value;
      const startTimeValue = document.getElementById('StartTime').value;
      const endTimeValue = document.getElementById('EndTime').value;
      const workOptionValue = document.getElementById('workOption').value.trim();
      const WFHreasonValue = document.getElementById('WFHreason').value.trim();
      const dateTimePicker1Value = document.getElementById('dateTimePicker1').value.trim();
      const dateTimePicker2Value = document.getElementById('dateTimePicker2').value.trim();
      if (selectedEmployees.length === 0) {
        alert("請選擇員工姓名");
        return;
      }
      if (!attendanceStatus) {
        alert("請選擇出缺勤狀況");
        return;
      }
      if (attendanceStatus === "上班") {
        showToast("打卡上班，今日一樣是社畜無誤");
      }
      if (attendanceStatus === "下班") {
        showToast("打卡下班，又是問薪無愧的一天");
      }
      if (attendanceStatus === "上班外勤") {
      if (startTimeValue && endTimeValue) {
      showToast("上班外勤，出公差當薪水小偷😂");
      } else {
      if (!startTimeValue) {
        alert("請填寫開始時間");
        return;
      }
      if (!endTimeValue) {
        alert("請填寫結束時間");
        return;
      }}}
      if (attendanceStatus === "請假") {
      if (dateTimePicker1Value && dateTimePicker2Value) {
      showToast("雖然請假但是你的心與我們同在");
      } else {
        if (!workOptionValue) {
        alert('請選擇假別')
        return;
      }
        if (!dateTimePicker1Value) {
        alert("請填寫開始時間");
        return;
      }
      if (!dateTimePicker2Value) {
        alert("請填寫結束時間");
        return;
      }}}
        
      if (attendanceStatus === "WFH") {
      if (WFHreasonValue) {
        showToast("今天終於可以睡得飽飽的～");
      } else {
        if (!WFHreasonValue) {
        alert("請填寫WFH原因");
        return;
      }}}     

  const combinedStartTime = `${startTimeValue}\n${dateTimePicker1Value}`;
  const combinedEndTime = `${endTimeValue}\n${dateTimePicker2Value}`;
  const formData = new FormData();
  formData.append('employeeName', selectedEmployees.join(','));
  formData.append('attendanceStatus', attendanceStatus);
  formData.append('workOption', workOptionValue);
  formData.append('StartTime', combinedStartTime);
  formData.append('EndTime', combinedEndTime);
  formData.append('WFHSection', WFHreasonValue);
  formData.append('dateTimePicker1', dateTimePicker1Value);
  formData.append('dateTimePicker2', dateTimePicker2Value);


    console.log("員工姓名: ", selectedEmployees.join(', '));
    console.log("出缺勤狀況:", attendanceStatus);
    console.log("假別:", workOptionValue);
    console.log("開始時間:", combinedStartTime);
    console.log("結束時間:", combinedEndTime);
    console.log("WFH原因:", WFHreasonValue);


    fetch('https://test-clockin-backend.zeabur.app/submit_attendance ', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
            employeeName: selectedEmployees.join(','),
            attendanceStatus: attendanceStatus,
            workOption: workOptionValue,
            StartTime: startTimeValue,
            EndTime: endTimeValue,
            WFHSection: WFHreasonValue,
            dateTimePicker1: dateTimePicker1Value,
            dateTimePicker2: dateTimePicker2Value,
        }),
      }).then(response => {
        if (response.ok) {
          console.log("打卡紀錄已儲存");
      
          
        }
        // 刷新網頁
        setTimeout(function() {
          location.reload();
        }, 1000);
});
});