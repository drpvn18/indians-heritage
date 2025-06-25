"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import styles from "./../../../styles/store/NewProduct.module.css";

export default function TagsField({ formData, setFormData }) {
    const [tags, setTags] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        if (formData?.tags?.length > 0 && tags?.length === 0) {
            setTags(formData?.tags);
        }
    }, [formData])

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleAddTag = (newTag) => {
        if (newTag && !tags.includes(newTag) && tags.length < 5) {
            setTags([...tags, newTag]);
        }
    };

    const handleRemoveTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (userInput.trim() !== "" && userInput.length <= 12 && tags.length < 5) {
                handleAddTag(userInput);
                setUserInput(""); // Clear the input after adding a tag
            }
        }
    };

    useEffect(() => {
        setFormData({
            ...formData,
            tags: tags,
        });
    }, [tags])

    return (
        <div>
            <div className={styles.section_title}>
                Tags
            </div>
            <div className={styles.form_sub_container}>
                <input
                    name="keyword_tags"
                    type="text"
                    placeholder={
                        tags.length < 5
                            ? "Add a tag"
                            : `You can only enter max. of ${5} tags`
                    }
                    className="w-full border-2 border-[#B3B3B3] rounded-sm px-[10px] py-[10px] h-[46px] my-[4px] focus:bg-white max-w-[300px]"
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    value={userInput}
                    disabled={tags.length === 5}
                />

                <div className="flex flex-row flex-wrap gap-3 mt-4">
                    {tags.map((tag, index) => (
                        <div
                            key={`${index}-${tag}`}
                            className="flex items-center gap-[8px] justify-start px-2 py-1 rounded-md text-[18px] shadow-md bg-[#E1F5EB] border border-[#E1F5EB] mr-2 outline-none"
                        >
                            {tag}
                            <button
                                className="text-black hover:text-red-600 cursor-pointer"
                                onClick={() => handleRemoveTag(tag)}
                                title={`Remove ${tag}`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}