var _BLOB = document.getElementById('blob'),
_CODE = document.getElementById('code'),
DIMS = ['x', 'y'];

function code() {var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var _R = getComputedStyle(_BLOB).borderRadius;

	if (!_R) {if (flag) _CODE.style.display = 'none';} else
	_CODE.textContent = 'border-radius: ' + _R;
};

function update(e) {
	var _TG = e.target;

	if (_TG.tagName.toLowerCase() === 'input') {
		var AX = +getComputedStyle(_TG).getPropertyValue('--ax'),
		V = +getComputedStyle(_TG).getPropertyValue('--v'),
		H = +getComputedStyle(_TG).getPropertyValue('--h');

		var val = +_TG.value;
		_BLOB.style.setProperty('--r' + DIMS[AX] + V + H, val + '%');
		_TG.parentNode.style.setProperty('--val', val);

		code();
	}
};

code(1);
addEventListener('input', update, false);
addEventListener('change', update, false);