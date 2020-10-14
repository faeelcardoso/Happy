import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602696191188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // aqui reliza alterações: criar tabela, novo campo, deletar...
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, // sempre vai ser positivo
                    isPrimary: true, 
                    isGenerated: true, // gerar esta coluna automaticamente
                    generationStrategy: 'increment', // incrementar automático
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name: 'instructions',
                    type: 'text',
                },
                {
                    name: 'opening_hours',
                    type: 'varchar',
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // desfaz tudo oq foi feito
        await queryRunner.dropTable('orphanages');
    }

}
