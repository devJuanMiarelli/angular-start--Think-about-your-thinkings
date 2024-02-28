import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  constructor(
    private servive: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { // propriedade snapshot -> tira "uma screenshot" da rota no momento que foi acessado e o paraMap trás as informações/parâmetros do pensamento, neste caso.
    const id = this.route.snapshot.paramMap.get('id');
    this.servive.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    })
  }

  excluirPensamento() {
    if(this.pensamento.id) {
      this.servive.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
