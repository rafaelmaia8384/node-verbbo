class VerbboUserLevel {

    static getLevelObject(pontos) {
        if (pontos < 100) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/01',
                descricao: 'Participante',
            };
        }
        else if (pontos < 1000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/02',
                descricao: 'Medalha de bronze',
            };
        }
        else if (pontos < 5000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/03',
                descricao: 'Medalha de prata',
            };
        }
        else if (pontos < 10000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/04',
                descricao: 'Medalha de ouro',
            };
        }
        else if (pontos < 20000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/05',
                descricao: 'Troféu de bronze',
            };
        }
        else if (pontos < 50000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/06',
                descricao: 'Troféu de prata',
            };
        }
        else if (pontos < 100000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/07',
                descricao: 'Troféu de ouro',
            };
        }
        else if (pontos < 500000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/08',
                descricao: 'Insígnia de bronze',
            };
        }
        else if (pontos < 1000000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/09',
                descricao: 'Bandeja de prata',
            };
        }
        else if (pontos < 10000000) {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/10',
                descricao: 'Coroa de ouro',
            };
        }
        else {
            return {
                pontos: pontos,
                path_image: 'estaticos/img/level/11',
                descricao: 'Diamante',
            };
        }
    }
}

module.exports = VerbboUserLevel;