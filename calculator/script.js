(function () {
  var current    = '0';
  var stored     = null;
  var pendingOp  = null;
  var freshInput = false;
  var lastCalc   = '';
  var elMain  = document.getElementById('mainDisplay');
  var elExpr  = document.getElementById('expression');
  var elHist  = document.getElementById('history');
  var clearBtn = document.querySelector('[data-action="clear"]');
  function fmt(n) {
  if (!isFinite(n) || isNaN(n)) return 'Error';
  var s = parseFloat(n.toPrecision(10)).toString();
  if (s.includes('e')) return parseFloat(n.toFixed(6)).toString();
  var parts = s.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
  }
  function compute(a, op, b) {
  switch (op) {
  case '+': return a + b;
  case '−': return a - b;
  case '×': return a * b;
  case '÷': return b === 0 ? NaN : a / b;
  }
  return b;
  }
  function render() {
  var display = current === 'Error' ? 'Error' : fmt(parseFloat(current) || 0);
  if (current.endsWith('.') && current !== 'Error') display = fmt(parseFloat(current)) + '.';
  elMain.textContent = display;
  var len = display.replace(/[^0-9]/g, '').length;
  elMain.style.fontSize = len > 12 ? '28px' : len > 9 ? '36px' : '44px';
  elExpr.textContent = (pendingOp && stored !== null)
  ? fmt(parseFloat(stored)) + ' ' + pendingOp
  : '';
  elHist.textContent = lastCalc;
  document.querySelectorAll('.key.op').forEach(function (btn) {
  btn.classList.toggle('active-op', btn.dataset.val === pendingOp && freshInput);
  });
  clearBtn.textContent = (current !== '0' && !freshInput) ? '⌫' : 'AC';
  clearBtn.classList.toggle('backspace-mode', current !== '0' && !freshInput);
  }
  function handleDigit(v) {
  if (current === 'Error') return;
  if (freshInput) {
  current    = v;
  freshInput = false;
  } else {
  current = current === '0' ? v : (current.length < 13 ? current + v : current);
  }
  }
  function handleDot() {
  if (current === 'Error') return;
  if (freshInput) { current = '0.'; freshInput = false; return; }
  if (!current.includes('.')) current += '.';
  }
  function handleOp(op) {
  if (current === 'Error') return;
  if (stored !== null && pendingOp && !freshInput) {
  var res = compute(parseFloat(stored), pendingOp, parseFloat(current));
  stored  = isNaN(res) || !isFinite(res) ? 'Error' : String(res);
  current = stored;
  } else {
  stored = current;
  }
  pendingOp  = op;
  freshInput = true;
  }
  function handleEquals() {
  if (stored === null || pendingOp === null || current === 'Error') return;
  var a   = parseFloat(stored);
  var b   = parseFloat(current);
  var res = compute(a, pendingOp, b);
  lastCalc  = fmt(a) + ' ' + pendingOp + ' ' + fmt(b) + ' = ' + fmt(res);
  current = isNaN(res) || !isFinite(res) ? 'Error' : String(parseFloat(res.toPrecision(10)));
  stored = null;
  pendingOp = null;
  freshInput= true;
  }
  function handleClear() {
  if (clearBtn.textContent === '⌫') {
  current = current.length > 1 ? current.slice(0, -1) : '0';
  return;
    }
  current = '0'; stored = null; pendingOp = null; freshInput = false; lastCalc = '';
  }
  function handleSign() {
  if (current === 'Error' || current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  }
  function handlePercent() {
  if (current === 'Error') return;
  current = String(parseFloat(current) / 100);
  freshInput = false;
  }
  document.getElementById('keypad').addEventListener('click', function (e) {
  var btn = e.target.closest('.key');
  if (!btn) return;
  var action = btn.dataset.action;
  var val    = btn.dataset.val;
  if(action === 'digit')handleDigit(val);
  else if (action === 'dot')handleDot();
  else if (action === 'op')handleOp(val);
  else if (action === 'equals')handleEquals();
  else if (action === 'clear')handleClear();
  else if (action === 'sign')handleSign();
  else if (action === 'percent') handlePercent();
  render();
  });
document.addEventListener('keydown', function (e) {
  var k = e.key;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if ('0123456789'.includes(k)){ handleDigit(k); }
  else if (k === '.'){ handleDot(); }
  else if (k === '+'){ handleOp('+'); }
  else if (k === '-'){ handleOp('−'); }
  else if (k === '*'){ handleOp('×'); }
  else if (k === '/'){ e.preventDefault(); handleOp('÷'); }
  else if (k === 'Enter' || k === '='){ handleEquals(); }
  else if (k === 'Escape'){ current='0'; stored=null; pendingOp=null; freshInput=false; lastCalc=''; }
  else if (k === 'Backspace'){
  if (current !== '0' && !freshInput)
  current = current.length > 1 ? current.slice(0, -1) : '0';
  }
  else if (k === '%'){ handlePercent(); }
  else return;
render();
  });
render();
})();
