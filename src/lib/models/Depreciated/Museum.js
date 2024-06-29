import mongoose from 'mongoose';

const { Schema, model, Models } = mongoose;

const artefactSchema = new Schema({
    "_id": { type: Schema.Types.ObjectId },
    id: {
        type: String,
        required: true
    },
    dateContributed: {
        type: String,
        required: true
    },
    contributorEmail: {
        type: String,
        required: true
    },
    sourceType: {
        type: String,
        required: true
    },
    museumName: {
        type: String,
        required: true
    },
    museumType: {
        type: String,
        required: true
    },
    museumAddress: {
        type: String,
        required: true
    },
    contactPersonName: {
        type: String,
        required: true
    },
    artefactTitle: {
        type: String,
        required: true
    },
    artefactDescription: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    sources: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    keywordsUsed: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    creditLine: {
        type: String,
        required: true
    },
    publicDomainDesignation: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    provenance: {
        type: String,
        required: true
    },
    multimedia: {
        type: String,
        required: true
    }
});

const Museum = mongoose.models.Museum || new mongoose.model('Museum', artefactSchema);


export default Museum;
