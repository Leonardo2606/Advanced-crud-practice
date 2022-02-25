

export function editedRow(ev) {
    const tr = ev.target.closest('tr');
    const valores = {
        nome: tr.childNodes[0].innerHTML, 
        cep: tr.childNodes[1].innerHTML, 
        uf: tr.childNodes[2].innerHTML, 
        data: tr.childNodes[3].innerHTML};
    
    if(tr.accessKey == 1) {
        tr.childNodes.forEach(element => {
            element.contentEditable = false;
        })
        tr.lastChild.firstChild.firstChild.firstChild
        .setAttribute('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');
        tr.accessKey = 0;
        console.log('fechando acesso a edição'); 
        console.log('enviando'); 
        return valores;
        } else {
            tr.childNodes.forEach(element => {
                if(element.id === 'nonEditable') return element.contentEditable = false;
                else {
                    element.contentEditable = true;
                }
            });
            tr.accessKey = 1;
            tr.lastChild.firstChild.firstChild.firstChild
            .setAttribute('d', 'M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z');
            console.log('ligando acesso a edição'); 
        }
}