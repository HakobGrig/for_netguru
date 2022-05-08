import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        type: "time without time zone"
    })
    released!: Date;

    @Column()
    genre!: string;

    @Column()
    director!: string;
}