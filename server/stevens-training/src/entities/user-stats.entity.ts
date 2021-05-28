/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class UserStats {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   height: number;
 
   @Column()
   weight: number;

   @CreateDateColumn()
   createdAt: string;
 }