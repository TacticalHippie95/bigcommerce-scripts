(function(){
  var config = {
    minimumAge: 21,
    sessionKey: 'ageVerified',
    cookieName: 'age_verified',
    cookieDays: 30,
    companyName: 'Liberty Tactical',
    complianceNote: 'Federal law requires you to be at least 21 years old to purchase handgun ammunition and 18 years old to purchase rifle/shotgun ammunition.'
  };
  
  function hasVerified() {
    if (sessionStorage.getItem(config.sessionKey) === 'true') return true;
    if (getCookie(config.cookieName) === 'verified') {
      sessionStorage.setItem(config.sessionKey, 'true');
      return true;
    }
    return false;
  }
  
  function setVerified() {
    sessionStorage.setItem(config.sessionKey, 'true');
    setCookie(config.cookieName, 'verified', config.cookieDays);
  }
  
  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/; SameSite=Strict';
  }
  
  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  function calculateAge(birthDate) {
    var today = new Date();
    var birth = new Date(birthDate);
    var age = today.getFullYear() - birth.getFullYear();
    var monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
  
  if (hasVerified()) return;
  
  document.body.style.overflow = 'hidden';
  
  var modalHTML = '<div id="ageVerificationGate" style="display:flex;position:fixed;z-index:999999;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.95);backdrop-filter:blur(10px);align-items:center;justify-content:center;animation:fadeIn 0.3s"><div style="background:#fff;padding:0;max-width:500px;width:90%;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);animation:slideUp 0.4s;text-align:center"><div style="background:linear-gradient(135deg,#2c3e50 0%,#34495e 100%);color:#fff;padding:30px;border-radius:12px 12px 0 0"><div style="font-size:48px;margin-bottom:10px">🔞</div><h2 style="margin:0;font-size:28px;font-weight:700">Age Verification Required</h2></div><div style="padding:40px 30px"><p style="font-size:16px;color:#333;line-height:1.6;margin:0 0 25px 0">' + config.companyName + ' sells ammunition and related products. You must be of legal age to access this website.</p><div style="background:#fff3cd;border:2px solid #ffc107;border-radius:8px;padding:15px;margin-bottom:25px;text-align:left"><p style="margin:0;font-size:14px;color:#856404;line-height:1.5"><strong>⚠️ Legal Notice:</strong><br>' + config.complianceNote + '</p></div><form id="ageVerifyForm"><label style="display:block;font-weight:600;color:#333;margin-bottom:12px;font-size:16px">Enter Your Date of Birth</label><div style="display:flex;gap:10px;margin-bottom:20px;justify-content:center"><select id="birthMonth" required style="flex:1;padding:12px;border:2px solid #ddd;border-radius:6px;font-size:16px;background:#fff;cursor:pointer"><option value="">Month</option><option value="01">January</option><option value="02">February</option><option value="03">March</option><option value="04">April</option><option value="05">May</option><option value="06">June</option><option value="07">July</option><option value="08">August</option><option value="09">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select><select id="birthDay" required style="flex:1;padding:12px;border:2px solid #ddd;border-radius:6px;font-size:16px;background:#fff;cursor:pointer"><option value="">Day</option></select><select id="birthYear" required style="flex:1;padding:12px;border:2px solid #ddd;border-radius:6px;font-size:16px;background:#fff;cursor:pointer"><option value="">Year</option></select></div><div style="margin-bottom:25px;text-align:left"><label style="display:flex;align-items:center;cursor:pointer;font-size:14px;color:#555;justify-content:center"><input type="checkbox" id="rememberMe" checked style="margin-right:8px;width:18px;height:18px;cursor:pointer">Remember me for 30 days</label></div><div id="errorMessage" style="display:none;background:#f8d7da;border:1px solid #f5c6cb;color:#721c24;padding:12px;border-radius:6px;margin-bottom:20px;font-size:14px"></div><div style="display:flex;gap:10px"><button type="submit" style="flex:1;background:linear-gradient(135deg,#28a745 0%,#20923a 100%);color:#fff;border:none;padding:14px 24px;border-radius:6px;cursor:pointer;font-size:16px;font-weight:600;transition:transform 0.2s,box-shadow 0.2s">✓ I am ' + config.minimumAge + '+</button><button type="button" id="exitBtn" style="flex:1;background:linear-gradient(135deg,#dc3545 0%,#c82333 100%);color:#fff;border:none;padding:14px 24px;border-radius:6px;cursor:pointer;font-size:16px;font-weight:600;transition:transform 0.2s,box-shadow 0.2s">✗ I am under ' + config.minimumAge + '</button></div></form><p style="margin-top:25px;font-size:12px;color:#999;line-height:1.4">By entering this site, you certify that you are of legal age and agree to our Terms of Service. We do not sell to prohibited persons.</p></div></div></div><style>@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}#ageVerifyForm select:focus{outline:none;border-color:#28a745;box-shadow:0 0 0 3px rgba(40,167,69,0.1)}</style>';
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  var daySelect = document.getElementById('birthDay');
  for (var i = 1; i <= 31; i++) {
    var option = document.createElement('option');
    option.value = i < 10 ? '0' + i : i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
  
  var yearSelect = document.getElementById('birthYear');
  var currentYear = new Date().getFullYear();
  for (var y = currentYear - 18; y >= currentYear - 100; y--) {
    var option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
  
  var form = document.getElementById('ageVerifyForm');
  var errorMsg = document.getElementById('errorMessage');
  
  form.onsubmit = function(e) {
    e.preventDefault();
    var month = document.getElementById('birthMonth').value;
    var day = document.getElementById('birthDay').value;
    var year = document.getElementById('birthYear').value;
    
    if (!month || !day || !year) {
      showError('Please enter your complete date of birth.');
      return;
    }
    
    var birthDate = year + '-' + month + '-' + day;
    var age = calculateAge(birthDate);
    
    if (age >= config.minimumAge) {
      if (document.getElementById('rememberMe').checked) {
        setVerified();
      } else {
        sessionStorage.setItem(config.sessionKey, 'true');
      }
      closeAgeGate();
    } else {
      showError('You must be at least ' + config.minimumAge + ' years old to access this website.');
    }
  };
  
  document.getElementById('exitBtn').onclick = function() {
    window.location.href = 'https://www.google.com';
  };
  
  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    setTimeout(function() {
      errorMsg.style.display = 'none';
    }, 5000);
  }
  
  function closeAgeGate() {
    var gate = document.getElementById('ageVerificationGate');
    gate.style.animation = 'fadeOut 0.3s';
    setTimeout(function() {
      gate.remove();
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  var style = document.createElement('style');
  style.textContent = '@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }';
  document.head.appendChild(style);
})();
