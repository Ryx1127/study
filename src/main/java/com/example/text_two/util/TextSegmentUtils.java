package com.example.text_two.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

public final class TextSegmentUtils {

    private TextSegmentUtils() {
    }

    public static List<String> splitIntoChunks(String content, int maxLength) {
        String normalized = normalize(content);
        String[] blocks = normalized.split("\\n+");
        List<String> chunks = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        for (String block : blocks) {
            if (block.isBlank()) {
                continue;
            }
            List<String> sentences = splitSentences(block.trim());
            for (String sentence : sentences) {
                if (current.length() + sentence.length() + 1 > maxLength && current.length() > 0) {
                    chunks.add(current.toString().trim());
                    current = new StringBuilder();
                }
                if (current.length() > 0) {
                    current.append('\n');
                }
                current.append(sentence.trim());
            }
        }
        if (current.length() > 0) {
            chunks.add(current.toString().trim());
        }
        if (chunks.isEmpty() && !normalized.isBlank()) {
            chunks.add(normalized);
        }
        return chunks;
    }

    public static Set<String> tokenize(String text) {
        String normalized = normalize(text).toLowerCase(Locale.ROOT);
        Set<String> tokens = new LinkedHashSet<>();
        for (String word : normalized.replaceAll("[^\\p{IsHan}a-z0-9]+", " ").split("\\s+")) {
            if (word.length() >= 2) {
                tokens.add(word);
            }
        }
        String chineseOnly = normalized.replaceAll("[^\\p{IsHan}]+", "");
        for (int i = 0; i < chineseOnly.length() - 1; i++) {
            tokens.add(chineseOnly.substring(i, i + 2));
        }
        return tokens;
    }

    public static String extractKeywords(String text, int limit) {
        List<String> values = new ArrayList<>(tokenize(text));
        if (values.size() > limit) {
            values = values.subList(0, limit);
        }
        return String.join(", ", values);
    }

    public static double calculateScore(String question, String candidate) {
        Set<String> questionTokens = tokenize(question);
        Set<String> candidateTokens = tokenize(candidate);
        if (questionTokens.isEmpty() || candidateTokens.isEmpty()) {
            return 0D;
        }
        double score = 0D;
        for (String token : questionTokens) {
            if (candidateTokens.contains(token) || candidate.contains(token)) {
                score += Math.max(1.0D, token.length() * 0.8D);
            }
        }
        String compactQuestion = normalize(question).replace(" ", "");
        if (compactQuestion.length() >= 4 && normalize(candidate).contains(compactQuestion.substring(0, 4))) {
            score += 2.5D;
        }
        return score;
    }

    public static String summarize(String text, int maxLength) {
        String normalized = normalize(text);
        if (normalized.length() <= maxLength) {
            return normalized;
        }
        return normalized.substring(0, maxLength) + "...";
    }

    public static String joinSnippets(Collection<String> snippets) {
        return String.join("\n", snippets);
    }

    private static String normalize(String text) {
        if (text == null) {
            return "";
        }
        return text.replace("\r", "").trim();
    }

    private static List<String> splitSentences(String block) {
        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        for (char item : block.toCharArray()) {
            current.append(item);
            if ("。！？!?；;".indexOf(item) >= 0) {
                result.add(current.toString());
                current = new StringBuilder();
            }
        }
        if (current.length() > 0) {
            result.add(current.toString());
        }
        return result;
    }
}
