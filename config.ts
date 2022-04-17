/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as pulumi from "@pulumi/pulumi";

const env = pulumi.getStack();
const configPulumi = new pulumi.Config();
export const stack = pulumi.getStack();

export const generalTagName = configPulumi.get("generalTagName");
export const kmsArn = configPulumi.get("kmsArn");

let configEncrypt = {
    enabled: false
};

if (kmsArn) {
    configEncrypt['enabled'] = true;
    configEncrypt['kmsKeyArn'] = kmsArn;
}

export const serverSideEncryption = configEncrypt;
