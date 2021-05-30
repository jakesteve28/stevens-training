/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
 
 @Entity()  
 export class Message {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   body: string;

   @ManyToOne(type => User, user => user.sentmessages)
   sender: User;
 
   @ManyToOne(type => User, user => user.receivedmessages)
   recipient: User;
 
   @CreateDateColumn()
   createdAt: string;
 }