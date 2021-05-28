/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class Story {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   userId: string;
 
   @Column()
   galleryId: string;
 
   @CreateDateColumn()
   createdAt: string;
 }