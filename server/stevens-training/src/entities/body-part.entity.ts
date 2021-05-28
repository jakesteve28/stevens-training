/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class BodyPart {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;
 
   @Column()
   img: string;
 
   @Column()
   desc: string;
 
   @CreateDateColumn()
   createdAt: string;
 }