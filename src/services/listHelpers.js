function editedRow(ev) {
    const tr = ev.target.closest('tr');
    const valores = {
        name: tr.childNodes[0].innerHTML,
        email: tr.childNodes[1].innerHTML,
        cep: tr.childNodes[2].innerHTML,
        data: tr.childNodes[3].innerHTML};
    return valores;
};

function restoreInfo(ev, info){
    const tr = ev.target.closest('tr');
    tr.childNodes[0].innerHTML = info.name;
    tr.childNodes[1].innerHTML = info.email;
    tr.childNodes[2].innerHTML = info.cep;
    tr.childNodes[3].innerHTML = info.data;
}

export {editedRow, restoreInfo};