export function editedRow(ev) {
    const tr = ev.target.closest('tr');
    const valores = {
        name: tr.childNodes[0].innerHTML, 
        cep: tr.childNodes[1].innerHTML, 
        uf: tr.childNodes[2].innerHTML, 
        data: tr.childNodes[3].innerHTML};
    return valores;
};