const books=[];
const RENDER_EVENT='render-event';

document.addEventListener('DOMContentLoaded', function(){
    const submitForm= document.getElementById('form-buku');

    submitForm.addEventListener('submit', function(e){
        e.preventDefault();
        tambahBuku();

    });

});


function tambahBuku(){
    const judulBuku=document.getElementById('judul-buku').value;
    const penulisBuku=document.getElementById('penulis-buku').value;
    const tahunBuku=document.getElementById('tahun-buku').value;
   

    const generatedID=generateId();
    const bukuObject=generateBukuObject(generatedID, judulBuku, penulisBuku, tahunBuku, false);
    books.push(bukuObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveDataBook();
}



function generateId(){
    return +new Date();
}

function generateBukuObject(id, judulBuku, penulisBuku, tahunBuku, isCompleted){
    return{
        id,
        judulBuku,
        penulisBuku,
        tahunBuku,
        isCompleted
    }
}

const checkBox=document.getElementById('checkSelesai');
checkBox.addEventListener('click', function(){
    for(listbook of books){
        if(listbook.isCompleted){
          moveBookToRead(bukuObject.id);
        }
    }
});


document.addEventListener(RENDER_EVENT, function(){
    const unReadBook=document.getElementById('belum-dibaca');
   unReadBook.innerHTML='';

   const readBook=document.getElementById('sudah-dibaca');
   readBook.innerHTML='';

   
   
});

function saveBook(bukuObject){
    const fieldJudul=document.createElement('h2');
    fieldJudul.innerText=bukuObject.judul;
    const fieldPenulis=document.createElement('p');
    fieldPenulis.innerText=bukuObject.penulis;
    const fieldTahun=document.createElement('p');
    fieldTahun.innerText=bukuObject.tahun;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(fieldJudul, fieldPenulis,fieldTahun);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `buku-${bukuObject.id}`);
    // console.log(container);


    if(bukuObject.isCompleted){
        const tombolBatal=document.createElement('button');
        tombolBatal.classList.add('tombol-batal');
        tombolBatal.innerHTML='<i class="fas fa-undo"></i>';
        //memindahkan buku dari selesai ke belum selesai dibaca
        tombolBatal.addEventListener('click', function(){
            moveUnReadBook(bukuObject.id);
        });

        const deleteBuku=document.createElement('button');
        deleteBuku.classList.add('delete-buku');
        deleteBuku.innerHTML='<i class="fas fa-trash"></i>';
        deleteBuku.addEventListener('click', function(){
            deleteBook(bukuObject.id);
        });
        container.append(tombolBatal, deleteBuku);

    }else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        checkButton.innerHTML='<i class="fas fa-check"></i>';
         //memindahkan buku dari rak 'belum dibaca' ke rak 'sudah dibaca'.
        checkButton.addEventListener('click', function () {
          moveBookToRead(bukuObject.id);
        });

        const deleteBuku=document.createElement('button');
        deleteBuku.classList.add('delete-buku');
        deleteBuku.innerHTML='<i class="fas fa-trash"></i>';
        deleteBuku.addEventListener('click', function(){
            deleteBook(bukuObject.id);
        });
        
        container.append(checkButton, deleteBuku);
      }

      function deleteBook(idBook){
        const bookTarget=findBookId(idBook);
        const konfir=confirm('Apakah anda yakin ingin menghapus buku ini?');
        // if(bookTarget==-1) return;
        if(konfir){

        books.splice(bookTarget,1);
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveDataBook();
        }
    }
    

      function findBookId(idBook){
        for(const index in books){
            if(books[index].id===idBook){
                return index;
            }
        }
        return -1;
    }

    function moveUnReadBook(idBook){
        const bookTarget=findBook(idBook);
        if(bookTarget==null) return;
        bookTarget.isCompleted=false;
        document.dispatchEvent(new Event(RENDER_EVENT));
         saveDataBook();

    }

      return container;
}

function moveBookToRead(idBook){
    const bookTarget=findBook(idBook);
    if(bookTarget==null) return;
    bookTarget.isCompleted=true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveDataBook();

}
function findBook(idBook){
    for(const listBuku of books){
        if(listBuku.id===idBook){
            return listBuku;
        }
    }
    return null;
}