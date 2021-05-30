/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
 
 @Entity()  
 export class Story {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @OneToOne(type => User, user => user.story)
   user: User;
 
   @Column( { default: "" } )
   galleryId: string;
 
   @CreateDateColumn()
   createdAt: string;
 }