import { Client, Account, ID, Storage, Databases, Query } from "appwrite";
import config from "../mvyer";






class AuthService {
    7
    client = new Client();
    account;
    databases;
    storage;





    constructor() {
        this.client.setProject(config.Project_Id);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async create_A_NEW_USER(name, email, password) {
        try {
            const response = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message }
        }

    }

    async LOGIN_AS_USER(email, password) {
        try {
            const response = await this.account.createEmailPasswordSession(
                email,
                password
            );
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getCurrentUser() {
        try {
            const response = await this.account.get();
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async LogOut_Function() {
        try {
            const response = await this.account.deleteSessions();
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async ImageUpload(file) {
        try {
            const response = await this.storage.createFile(
                config.BucketIdForUsers,
                ID.unique(),
                file
            );
            return { success: true, data: response }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async uploadANewNote(title, content, userId, Public) {
        try {
            // console.log(userId, image);
            const response = await this.databases.createDocument(
                config.DataBaseId,
                config.CollectionIdForNotes,
                ID.unique(),
                {
                    title, content, userId, Public
                }
            );
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // async getFilePreview(fileid) {

    //     try {
    //         const response = await this.storage.getFileView(config.BucketIdForUsers, fileid);
    //         return { success: true, data: response };
    //     } catch (error) {
    //         return { success: false, error: error.message };
    //     }
    // }

    async ListAllPrivateNotes(userId) {

        // this will get data from userdatabase not from the bucket
        try {
            const response = await this.databases.listDocuments(
                config.DataBaseId,
                config.CollectionIdForNotes,
                [
                    Query.equal("userId", userId)
                ]
            );
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getSingleDocument(documentId) {

        // this will get data from userdatabase not from the bucket
        // console.log(documentId);
        try {
            const response = await this.databases.getDocument(
                config.DataBaseId,
                config.CollectionIdForNotes,
                documentId,
            );
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async ListPublicNotes() {

        try {
            const response = await this.databases.listDocuments(
                config.DataBaseId,
                config.CollectionIdForNotes,
                [
                    Query.equal("Public", true)
                ]
            );
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async DeleteASingleDocument(documentId) {

        try {
            const response = await this.databases.deleteDocument(
                config.DataBaseId, 
                config.CollectionIdForNotes, 
                documentId
            );
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }


    async UpdateASingleDocument(documentId , title, content, userId, Public) {

        try {
            const response = await this.databases.updateDocument(
                config.DataBaseId, 
                config.CollectionIdForNotes, 
                documentId, 
                {
                    title, content, userId, Public
                } 

            );
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};





const authservice = new AuthService();

export default authservice;