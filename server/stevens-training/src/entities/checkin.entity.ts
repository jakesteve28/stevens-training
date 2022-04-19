/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
  
  @Entity()  
  export class Checkin {
    @PrimaryGeneratedColumn("uuid")
    id: string;
 
    @Column()
    userId: string;

    @Column()
    timeEntered: number; 

    @Column()
    timeLeft: number; 

    @Column()
    placeId: string;
  
    @CreateDateColumn()
    createdAt: string;

    @Column({ default: '' })
    workoutId: string;
    
  }