import "./chunk-ZVATTXSA.js";

// node_modules/@angular/common/locales/es-CL.mjs
var u = void 0;
function plural(val) {
  const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, "").length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, "$2")) || 0;
  if (n === 1) return 1;
  if (e === 0 && !(i === 0) && i % 1e6 === 0 && v === 0 || !(e >= 0 && e <= 5)) return 4;
  return 5;
}
var es_CL_default = ["es-CL", [["a. m.", "p. m."], u, u], u, [["d", "l", "m", "m", "j", "v", "s"], ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], ["do", "lu", "ma", "mi", "ju", "vi", "sá"]], [["D", "L", "M", "M", "J", "V", "S"], ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], ["DO", "LU", "MA", "MI", "JU", "VI", "SA"]], [["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]], [["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."], ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]], [["a. C.", "d. C."], u, ["antes de Cristo", "después de Cristo"]], 1, [6, 0], ["dd-MM-yy", "dd-MM-y", "d 'de' MMMM 'de' y", "EEEE, d 'de' MMMM 'de' y"], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1}, {0}", "{1} {0}", "{1}, {0}", u], [",", ".", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0 %", "¤#,##0.00;¤-#,##0.00", "#E0"], "CLP", "$", "Peso chileno", {
  "AUD": [u, "$"],
  "BRL": [u, "R$"],
  "BYN": [u, "р."],
  "CAD": [u, "$"],
  "CLP": ["$"],
  "CNY": [u, "¥"],
  "ESP": ["₧"],
  "EUR": [u, "€"],
  "FKP": [u, "FK£"],
  "GBP": [u, "£"],
  "HKD": [u, "$"],
  "ILS": [u, "₪"],
  "INR": [u, "₹"],
  "JPY": [u, "¥"],
  "KRW": [u, "₩"],
  "MXN": [u, "$"],
  "NZD": [u, "$"],
  "PHP": [u, "₱"],
  "RON": [u, "L"],
  "SSP": [u, "SD£"],
  "SYP": [u, "S£"],
  "TWD": [u, "NT$"],
  "USD": ["US$", "$"],
  "VEF": [u, "BsF"],
  "VND": [u, "₫"],
  "XAF": [],
  "XCD": [u, "$"],
  "XOF": []
}, "ltr", plural];
export {
  es_CL_default as default
};
/*! Bundled license information:

@angular/common/locales/es-CL.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)
*/
//# sourceMappingURL=@angular_common_locales_es-CL.js.map
